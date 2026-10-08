using UnityEngine;

namespace Comiks.World
{
    /// <summary>Процедурні текстури, що безшовно повторюються (трава, пісок, скеля, сніг, вода).</summary>
    public static class TextureFactory
    {
        static float Hash(int x, int y, int seed)
        {
            unchecked
            {
                uint h = (uint)(x * 374761393 + y * 668265263 + seed * 1442695041);
                h = (h ^ (h >> 13)) * 1274126177u;
                h ^= h >> 16;
                return (h & 0xFFFFFF) / (float)0x1000000;
            }
        }

        static float ValueNoise(float u, float v, int cells, int seed)
        {
            float gx = u * cells;
            float gy = v * cells;
            int ix = Mathf.FloorToInt(gx);
            int iy = Mathf.FloorToInt(gy);
            float fx = gx - ix;
            float fy = gy - iy;
            fx = fx * fx * (3f - 2f * fx);
            fy = fy * fy * (3f - 2f * fy);

            int x0 = ((ix % cells) + cells) % cells;
            int y0 = ((iy % cells) + cells) % cells;
            int x1 = (x0 + 1) % cells;
            int y1 = (y0 + 1) % cells;

            float a = Hash(x0, y0, seed);
            float b = Hash(x1, y0, seed);
            float c = Hash(x0, y1, seed);
            float d = Hash(x1, y1, seed);
            return Mathf.Lerp(Mathf.Lerp(a, b, fx), Mathf.Lerp(c, d, fx), fy);
        }

        public static Texture2D Tileable(int size, Color a, Color b, int baseCells, int octaves, int seed, float contrast = 1.3f)
        {
            var tex = new Texture2D(size, size, TextureFormat.RGBA32, true);
            var px = new Color32[size * size];
            for (int y = 0; y < size; y++)
            {
                for (int x = 0; x < size; x++)
                {
                    float u = (float)x / size;
                    float v = (float)y / size;
                    float amp = 0.5f, sum = 0f, norm = 0f;
                    int cells = baseCells;
                    for (int o = 0; o < octaves; o++)
                    {
                        sum += amp * ValueNoise(u, v, cells, seed + o * 17);
                        norm += amp;
                        amp *= 0.5f;
                        cells *= 2;
                    }
                    float n = Mathf.Clamp01((sum / norm - 0.5f) * contrast + 0.5f);
                    px[y * size + x] = Color.Lerp(a, b, n);
                }
            }
            tex.SetPixels32(px);
            tex.wrapMode = TextureWrapMode.Repeat;
            tex.filterMode = FilterMode.Trilinear;
            tex.anisoLevel = 4;
            tex.Apply(true);
            return tex;
        }
    }
}
