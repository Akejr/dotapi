# Dot-source this file to get access to [ImgTool].
# Small GDI+ helper used to measure the design PNGs and extract brand assets
# (transparent wordmark / mark, cropped globe) without adding npm dependencies.

Add-Type -AssemblyName System.Drawing

if (-not ([System.Management.Automation.PSTypeName]'ImgTool').Type) {
$source = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Text;

public static class ImgTool
{
    // Always normalise to 32bpp ARGB so pixel math is uniform.
    private static byte[] Load(string path, out int w, out int h, out int stride)
    {
        using (var src = new Bitmap(path))
        {
            w = src.Width;
            h = src.Height;
            using (var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb))
            {
                using (var g = Graphics.FromImage(bmp))
                {
                    g.CompositingMode = CompositingMode.SourceCopy;
                    g.DrawImage(src, new Rectangle(0, 0, w, h));
                }
                var data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                stride = data.Stride;
                var bytes = new byte[stride * h];
                Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);
                bmp.UnlockBits(data);
                return bytes;
            }
        }
    }

    private static int Ink(byte[] b, int stride, int x, int y)
    {
        int i = y * stride + x * 4;
        int bl = b[i], gr = b[i + 1], re = b[i + 2];
        return Math.Max(re, Math.Max(gr, bl));
    }

    public static string Size(string path)
    {
        int w, h, stride;
        Load(path, out w, out h, out stride);
        return w + "x" + h;
    }

    /// <summary>Bucketed row/column ink histograms - used to find text bands and letter gaps.</summary>
    public static string Profile(string path, int threshold, int rowBuckets, int colBuckets)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);

        var cols = new int[w];
        var rows = new int[h];
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                if (Ink(b, stride, x, y) >= threshold) { cols[x]++; rows[y]++; }

        var sb = new StringBuilder();
        sb.AppendLine("size\t" + w + "x" + h);
        sb.AppendLine("--- ROWS ---");
        for (int r = 0; r < rowBuckets; r++)
        {
            int a = (int)((long)r * h / rowBuckets), z = (int)((long)(r + 1) * h / rowBuckets);
            long s = 0;
            for (int y = a; y < z; y++) s += rows[y];
            sb.AppendLine(a + "-" + z + "\t" + s);
        }
        sb.AppendLine("--- COLS ---");
        for (int c = 0; c < colBuckets; c++)
        {
            int a = (int)((long)c * w / colBuckets), z = (int)((long)(c + 1) * w / colBuckets);
            long s = 0;
            for (int x = a; x < z; x++) s += cols[x];
            sb.AppendLine(a + "-" + z + "\t" + s);
        }
        return sb.ToString();
    }

    public static string Bbox(string path, int threshold, int rx, int ry, int rw, int rh)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        int minX = int.MaxValue, minY = int.MaxValue, maxX = -1, maxY = -1;
        for (int y = Math.Max(0, ry); y < y1; y++)
            for (int x = Math.Max(0, rx); x < x1; x++)
                if (Ink(b, stride, x, y) >= threshold)
                {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }

        if (maxX < 0) return "empty";
        return "x=" + minX + " y=" + minY + " w=" + (maxX - minX + 1) + " h=" + (maxY - minY + 1)
             + " (right=" + maxX + " bottom=" + maxY + ")";
    }

    /// <summary>Contiguous inked column runs inside a region - separates letters of a wordmark.</summary>
    /// <summary>Reports whether a PNG carries real transparency, and how much.</summary>
    public static string AlphaInfo(string path)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);

        int min = 255, max = 0;
        long clear = 0, partial = 0, opaque = 0;
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                int a = b[y * stride + x * 4 + 3];
                if (a < min) min = a;
                if (a > max) max = a;
                if (a == 0) clear++;
                else if (a == 255) opaque++;
                else partial++;
            }

        long total = (long)w * h;
        return string.Format(
            "{0}x{1}  alpha {2}..{3}  transparent {4:P1}  semi {5:P1}  opaque {6:P1}",
            w, h, min, max, (double)clear / total, (double)partial / total, (double)opaque / total);
    }

    /// <summary>Bounding box of pixels whose alpha is at or above the threshold.</summary>
    public static string BboxAlpha(string path, int threshold, int rx, int ry, int rw, int rh)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        int minX = int.MaxValue, minY = int.MaxValue, maxX = -1, maxY = -1;
        for (int y = Math.Max(0, ry); y < y1; y++)
            for (int x = Math.Max(0, rx); x < x1; x++)
            {
                if (b[y * stride + x * 4 + 3] < threshold) continue;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }

        if (maxX < 0) return "empty";
        return "x=" + minX + " y=" + minY + " w=" + (maxX - minX + 1) + " h=" + (maxY - minY + 1)
             + " (right=" + maxX + " bottom=" + maxY + ")";
    }

    /// <summary>Contiguous inked column runs by alpha - separates the letters of a wordmark.</summary>
    public static string ColumnRunsAlpha(string path, int threshold, int rx, int ry, int rw, int rh, int minInk)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        var sb = new StringBuilder();
        int runStart = -1;
        for (int x = Math.Max(0, rx); x < x1; x++)
        {
            int ink = 0;
            for (int y = Math.Max(0, ry); y < y1; y++)
                if (b[y * stride + x * 4 + 3] >= threshold) ink++;

            bool on = ink > minInk;
            if (on && runStart < 0) runStart = x;
            if (!on && runStart >= 0)
            {
                sb.AppendLine("run\t" + runStart + "\t" + (x - 1) + "\twidth=" + (x - runStart));
                runStart = -1;
            }
        }
        if (runStart >= 0) sb.AppendLine("run\t" + runStart + "\t" + (x1 - 1) + "\twidth=" + (x1 - runStart));
        return sb.ToString();
    }

    /// <summary>Contiguous inked row runs by alpha - separates the bands of a lockup.</summary>
    public static string RowRunsAlpha(string path, int threshold, int rx, int ry, int rw, int rh, int minInk)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        var sb = new StringBuilder();
        int runStart = -1;
        for (int y = Math.Max(0, ry); y < y1; y++)
        {
            int ink = 0;
            for (int x = Math.Max(0, rx); x < x1; x++)
                if (b[y * stride + x * 4 + 3] >= threshold) ink++;

            bool on = ink > minInk;
            if (on && runStart < 0) runStart = y;
            if (!on && runStart >= 0)
            {
                sb.AppendLine("band\ty=" + runStart + ".." + (y - 1) + "\theight=" + (y - runStart));
                runStart = -1;
            }
        }
        if (runStart >= 0) sb.AppendLine("band\ty=" + runStart + ".." + (y1 - 1) + "\theight=" + (y1 - runStart));
        return sb.ToString();
    }

    /// <summary>Bounding box of dark ink on a light background (luminance below the threshold).</summary>
    public static string BboxDark(string path, int threshold, int rx, int ry, int rw, int rh)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        int minX = int.MaxValue, minY = int.MaxValue, maxX = -1, maxY = -1;
        for (int y = Math.Max(0, ry); y < y1; y++)
            for (int x = Math.Max(0, rx); x < x1; x++)
            {
                int i = y * stride + x * 4;
                int lum = (b[i + 2] * 299 + b[i + 1] * 587 + b[i] * 114) / 1000;
                if (lum > threshold) continue;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }

        if (maxX < 0) return "empty";
        return "x=" + minX + " y=" + minY + " w=" + (maxX - minX + 1) + " h=" + (maxY - minY + 1)
             + " (right=" + maxX + " bottom=" + maxY + ")";
    }

    public static string ColumnRuns(string path, int threshold, int rx, int ry, int rw, int rh, int minInk)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        var sb = new StringBuilder();
        int runStart = -1;
        for (int x = Math.Max(0, rx); x < x1; x++)
        {
            int ink = 0;
            for (int y = Math.Max(0, ry); y < y1; y++)
                if (Ink(b, stride, x, y) >= threshold) ink++;

            bool on = ink > minInk;
            if (on && runStart < 0) runStart = x;
            if (!on && runStart >= 0)
            {
                sb.AppendLine("run\t" + runStart + "\t" + (x - 1) + "\twidth=" + (x - runStart));
                runStart = -1;
            }
        }
        if (runStart >= 0) sb.AppendLine("run\t" + runStart + "\t" + (x1 - 1) + "\twidth=" + (x1 - runStart));
        return sb.ToString();
    }

    /// <summary>
    /// Contiguous rows containing ink inside a region - reveals individual text lines,
    /// so line height and line count can be read straight off the design.
    /// mode 0 = dark ink on light, mode 1 = light ink on dark.
    /// </summary>
    public static string RowRuns(string path, int threshold, int rx, int ry, int rw, int rh, int minInk, int mode)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        int x1 = Math.Min(w, rx + (rw <= 0 ? w : rw));
        int y1 = Math.Min(h, ry + (rh <= 0 ? h : rh));

        var sb = new StringBuilder();
        int runStart = -1;
        int previousStart = -1;

        for (int y = Math.Max(0, ry); y < y1; y++)
        {
            int ink = 0;
            int left = int.MaxValue, right = -1;
            for (int x = Math.Max(0, rx); x < x1; x++)
            {
                int i = y * stride + x * 4;
                int lum = (b[i + 2] * 299 + b[i + 1] * 587 + b[i] * 114) / 1000;
                bool hit = mode == 0 ? lum <= threshold : lum >= threshold;
                if (!hit) continue;
                ink++;
                if (x < left) left = x;
                if (x > right) right = x;
            }

            bool on = ink > minInk;
            if (on && runStart < 0) runStart = y;
            if (!on && runStart >= 0)
            {
                sb.Append("line\ty=").Append(runStart).Append("..").Append(y - 1)
                  .Append("\theight=").Append(y - runStart);
                if (previousStart >= 0) sb.Append("\tbaselineStep=").Append(runStart - previousStart);
                sb.AppendLine();
                previousStart = runStart;
                runStart = -1;
            }
        }

        if (runStart >= 0)
            sb.Append("line\ty=").Append(runStart).Append("..").Append(y1 - 1)
              .Append("\theight=").Append(y1 - runStart).AppendLine();

        return sb.ToString();
    }

    /// <summary>
    /// Walks down a single column and reports every row where the colour changes by more
    /// than `delta`. Run it through a page gutter to read exact section boundaries.
    /// </summary>
    public static string ColumnScan(string path, int x, int delta)
    {
        int w, h, stride;
        var b = Load(path, out w, out h, out stride);
        var sb = new StringBuilder();

        int pr = -1, pg = -1, pb = -1;
        for (int y = 0; y < h; y++)
        {
            int i = y * stride + x * 4;
            int bl = b[i], g = b[i + 1], r = b[i + 2];
            if (pr >= 0 && Math.Abs(r - pr) + Math.Abs(g - pg) + Math.Abs(bl - pb) > delta)
            {
                sb.AppendFormat("y={0}\t#{1:X2}{2:X2}{3:X2} -> #{4:X2}{5:X2}{6:X2}", y, pr, pg, pb, r, g, bl);
                sb.AppendLine();
            }
            pr = r; pg = g; pb = bl;
        }
        return sb.ToString();
    }

    private static Bitmap Resample(Bitmap src, int outW)
    {
        if (outW <= 0 || outW == src.Width) return (Bitmap)src.Clone();
        int outH = (int)Math.Round(src.Height * (double)outW / src.Width);
        var dst = new Bitmap(outW, outH, PixelFormat.Format32bppArgb);
        using (var g = Graphics.FromImage(dst))
        {
            g.CompositingMode = CompositingMode.SourceCopy;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.DrawImage(src, new Rectangle(0, 0, outW, outH));
        }
        return dst;
    }

    public static string Crop(string src, string dst, int x, int y, int w, int h, int outW)
    {
        using (var img = new Bitmap(src))
        {
            var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, img.Width, img.Height));
            using (var cut = img.Clone(rect, PixelFormat.Format32bppArgb))
            using (var final = Resample(cut, outW))
            {
                final.Save(dst, ImageFormat.Png);
                return dst + " " + final.Width + "x" + final.Height;
            }
        }
    }

    /// <summary>
    /// Crops a region rendered on a (near black) background and lifts it onto transparency.
    /// Alpha is taken from the brightest channel after the background is subtracted, and the
    /// colour is un-premultiplied, so anti-aliased edges and the logo gradient survive intact.
    /// </summary>
    public static string CropKey(string src, string dst, int x, int y, int w, int h,
                                int bgR, int bgG, int bgB, int floor, int outW)
    {
        int sw, sh, stride;
        var b = Load(src, out sw, out sh, out stride);

        var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, sw, sh));
        using (var keyed = new Bitmap(rect.Width, rect.Height, PixelFormat.Format32bppArgb))
        {
            var data = keyed.LockBits(new Rectangle(0, 0, rect.Width, rect.Height), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            var outBytes = new byte[data.Stride * rect.Height];

            for (int yy = 0; yy < rect.Height; yy++)
            {
                for (int xx = 0; xx < rect.Width; xx++)
                {
                    int si = (rect.Y + yy) * stride + (rect.X + xx) * 4;
                    int bl = Math.Max(0, b[si] - bgB);
                    int gr = Math.Max(0, b[si + 1] - bgG);
                    int re = Math.Max(0, b[si + 2] - bgR);

                    int a = Math.Max(re, Math.Max(gr, bl));
                    int di = yy * data.Stride + xx * 4;

                    if (a <= floor)
                    {
                        outBytes[di] = 0; outBytes[di + 1] = 0; outBytes[di + 2] = 0; outBytes[di + 3] = 0;
                        continue;
                    }

                    // un-premultiply against black so the brightest channel maps to 255
                    outBytes[di] = (byte)Math.Min(255, bl * 255 / a);
                    outBytes[di + 1] = (byte)Math.Min(255, gr * 255 / a);
                    outBytes[di + 2] = (byte)Math.Min(255, re * 255 / a);
                    outBytes[di + 3] = (byte)a;
                }
            }

            Marshal.Copy(outBytes, 0, data.Scan0, outBytes.Length);
            keyed.UnlockBits(data);

            using (var final = Resample(keyed, outW))
            {
                final.Save(dst, ImageFormat.Png);
                return dst + " " + final.Width + "x" + final.Height;
            }
        }
    }

    /// <summary>Punches a fully transparent rectangle into an existing PNG.</summary>
    public static string ClearRect(string path, int x, int y, int w, int h)
    {
        Bitmap bmp;
        // Copy into a detached surface first: GDI+ keeps a file lock on the source
        // bitmap, which would fail the in-place Save below.
        using (var loaded = new Bitmap(path))
        {
            bmp = new Bitmap(loaded.Width, loaded.Height, PixelFormat.Format32bppArgb);
            using (var g = Graphics.FromImage(bmp))
            {
                g.CompositingMode = CompositingMode.SourceCopy;
                g.DrawImage(loaded, new Rectangle(0, 0, bmp.Width, bmp.Height));
            }
        }

        using (bmp)
        {
            var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, bmp.Width, bmp.Height));
            var data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            var bytes = new byte[data.Stride * bmp.Height];
            Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

            for (int yy = rect.Y; yy < rect.Bottom; yy++)
                for (int xx = rect.X; xx < rect.Right; xx++)
                {
                    int i = yy * data.Stride + xx * 4;
                    bytes[i] = 0; bytes[i + 1] = 0; bytes[i + 2] = 0; bytes[i + 3] = 0;
                }

            Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
            bmp.UnlockBits(data);
            bmp.Save(path, ImageFormat.Png);
            return path + " cleared " + rect;
        }
    }

    private static GraphicsPath RoundedRect(Rectangle r, int radius)
    {
        var path = new GraphicsPath();
        if (radius <= 0) { path.AddRectangle(r); return path; }
        int d = radius * 2;
        path.AddArc(r.X, r.Y, d, d, 180, 90);
        path.AddArc(r.Right - d, r.Y, d, d, 270, 90);
        path.AddArc(r.Right - d, r.Bottom - d, d, d, 0, 90);
        path.AddArc(r.X, r.Bottom - d, d, d, 90, 90);
        path.CloseFigure();
        return path;
    }

    /// <summary>
    /// Composes a crop of a transparent source onto a solid canvas of any size, scaled to
    /// fit within `scale` of the shorter axis. Used for the social card.
    /// </summary>
    public static string Card(string src, string dst, int cropX, int cropY, int cropW, int cropH,
                             int canvasW, int canvasH, int bgR, int bgG, int bgB, double scale)
    {
        using (var img = new Bitmap(src))
        {
            var rect = Rectangle.Intersect(new Rectangle(cropX, cropY, cropW, cropH),
                                           new Rectangle(0, 0, img.Width, img.Height));
            using (var cut = img.Clone(rect, PixelFormat.Format32bppArgb))
            using (var canvas = new Bitmap(canvasW, canvasH, PixelFormat.Format32bppArgb))
            using (var g = Graphics.FromImage(canvas))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.SmoothingMode = SmoothingMode.HighQuality;

                using (var brush = new SolidBrush(Color.FromArgb(255, bgR, bgG, bgB)))
                    g.FillRectangle(brush, 0, 0, canvasW, canvasH);

                double k = Math.Min(canvasW * scale / cut.Width, canvasH * scale / cut.Height);
                int w = (int)Math.Round(cut.Width * k);
                int h = (int)Math.Round(cut.Height * k);
                g.DrawImage(cut, new Rectangle((canvasW - w) / 2, (canvasH - h) / 2, w, h));

                canvas.Save(dst, ImageFormat.Png);
                return dst + " " + canvasW + "x" + canvasH;
            }
        }
    }

    /// <summary>Composes a transparent mark onto a solid rounded square - app icons / favicons.</summary>
    public static string Icon(string markPath, string dst, int size, int bgR, int bgG, int bgB, double scale, int radius)
    {
        using (var mark = new Bitmap(markPath))
        using (var canvas = new Bitmap(size, size, PixelFormat.Format32bppArgb))
        using (var g = Graphics.FromImage(canvas))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            using (var path = RoundedRect(new Rectangle(0, 0, size, size), radius))
            using (var brush = new SolidBrush(Color.FromArgb(255, bgR, bgG, bgB)))
                g.FillPath(brush, path);

            double k = Math.Min(size * scale / mark.Width, size * scale / mark.Height);
            int w = (int)Math.Round(mark.Width * k);
            int h = (int)Math.Round(mark.Height * k);
            g.DrawImage(mark, new Rectangle((size - w) / 2, (size - h) / 2, w, h));

            canvas.Save(dst, ImageFormat.Png);
            return dst + " " + size + "x" + size;
        }
    }

    /// <summary>
    /// Alpha-aware region report: average alpha, and the average colour of the pixels
    /// that are at least `minAlpha` opaque. Use it to read the true colour of artwork
    /// sitting on transparency.
    /// </summary>
    public static string RegionStats(string path, int x, int y, int w, int h, int minAlpha)
    {
        int sw, sh, stride;
        var b = Load(path, out sw, out sh, out stride);
        var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, sw, sh));

        long alphaSum = 0, n = 0, r = 0, g = 0, bb = 0, kept = 0;
        int maxAlpha = 0;
        for (int yy = rect.Y; yy < rect.Bottom; yy++)
            for (int xx = rect.X; xx < rect.Right; xx++)
            {
                int i = yy * stride + xx * 4;
                int a = b[i + 3];
                alphaSum += a; n++;
                if (a > maxAlpha) maxAlpha = a;
                if (a < minAlpha) continue;
                bb += b[i]; g += b[i + 1]; r += b[i + 2]; kept++;
            }

        if (n == 0) return "empty";
        if (kept == 0)
            return string.Format("avgAlpha={0:F0} maxAlpha={1} (no pixel reached alpha {2})",
                (double)alphaSum / n, maxAlpha, minAlpha);

        return string.Format("#{0:X2}{1:X2}{2:X2}  rgb({3},{4},{5})  avgAlpha={6:F0} maxAlpha={7} samples={8}",
            r / kept, g / kept, bb / kept, r / kept, g / kept, bb / kept,
            (double)alphaSum / n, maxAlpha, kept);
    }

    /// <summary>Average colour of a region - used to sample the design's exact palette.</summary>
    public static string AvgColor(string path, int x, int y, int w, int h)
    {
        int sw, sh, stride;
        var b = Load(path, out sw, out sh, out stride);
        var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, sw, sh));
        long r = 0, g = 0, bb = 0, n = 0;
        for (int yy = rect.Y; yy < rect.Bottom; yy++)
            for (int xx = rect.X; xx < rect.Right; xx++)
            {
                int i = yy * stride + xx * 4;
                bb += b[i]; g += b[i + 1]; r += b[i + 2]; n++;
            }
        if (n == 0) return "empty";
        return string.Format("#{0:X2}{1:X2}{2:X2}  rgb({3},{4},{5})  n={6}", r / n, g / n, bb / n, r / n, g / n, bb / n, n);
    }

    /// <summary>Darkest (mode 0) or brightest (mode 1) pixel in a region - reads text colours.</summary>
    public static string ExtremeColor(string path, int x, int y, int w, int h, int mode)
    {
        int sw, sh, stride;
        var b = Load(path, out sw, out sh, out stride);
        var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, sw, sh));
        int best = mode == 0 ? int.MaxValue : -1, br = 0, bg = 0, bbl = 0;
        for (int yy = rect.Y; yy < rect.Bottom; yy++)
            for (int xx = rect.X; xx < rect.Right; xx++)
            {
                int i = yy * stride + xx * 4;
                int bl = b[i], g = b[i + 1], r = b[i + 2];
                int lum = (r * 299 + g * 587 + bl * 114) / 1000;
                if (mode == 0 ? lum < best : lum > best) { best = lum; br = r; bg = g; bbl = bl; }
            }
        return string.Format("#{0:X2}{1:X2}{2:X2}  rgb({3},{4},{5})", br, bg, bbl, br, bg, bbl);
    }

    /// <summary>Most saturated / brightest pixel in a region - finds the true accent colour.</summary>
    public static string PeakColor(string path, int x, int y, int w, int h)
    {
        int sw, sh, stride;
        var b = Load(path, out sw, out sh, out stride);
        var rect = Rectangle.Intersect(new Rectangle(x, y, w, h), new Rectangle(0, 0, sw, sh));
        int bestScore = -1, br = 0, bg = 0, bbl = 0, bx = 0, by = 0;
        for (int yy = rect.Y; yy < rect.Bottom; yy++)
            for (int xx = rect.X; xx < rect.Right; xx++)
            {
                int i = yy * stride + xx * 4;
                int bl = b[i], g = b[i + 1], r = b[i + 2];
                int score = g - Math.Max(r, bl); // greenness
                if (score > bestScore) { bestScore = score; br = r; bg = g; bbl = bl; bx = xx; by = yy; }
            }
        return string.Format("#{0:X2}{1:X2}{2:X2}  rgb({3},{4},{5})  at {6},{7}", br, bg, bbl, br, bg, bbl, bx, by);
    }
}
'@

    Add-Type -TypeDefinition $source -ReferencedAssemblies 'System.Drawing' | Out-Null
}
