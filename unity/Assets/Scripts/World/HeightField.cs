using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Математична «карта висот» острова: узбережжя, гори, фйорд і рівне плато під село.
    /// Усі висоти нормалізовані (0..1), множаться на висоту терейну.
    /// </summary>
    public sealed class HeightField
    {
        public const float SeaLevel = 0.20f;
        public const float VillageLevel = 0.27f;
        public const float VillageFlatRadius = 0.07f;
        public const float VillageBlendRadius = 0.16f;

        readonly Vector2 offBase;
        readonly Vector2 offRidge;
        readonly Vector2 offWarp;

        public HeightField(int seed)
        {
            var r = new System.Random(seed);
            offBase = new Vector2(r.Next(0, 10000), r.Next(0, 10000));
            offRidge = new Vector2(r.Next(0, 10000), r.Next(0, 10000));
            offWarp = new Vector2(r.Next(0, 10000), r.Next(0, 10000));
        }

        public static float Smooth(float a, float b, float x)
        {
            float t = Mathf.Clamp01((x - a) / (b - a));
            return t * t * (3f - 2f * t);
        }

        static float Fbm(float x, float y, int octaves, Vector2 off)
        {
            float amp = 0.5f, freq = 1f, sum = 0f, norm = 0f;
            for (int i = 0; i < octaves; i++)
            {
                sum += amp * Mathf.PerlinNoise(x * freq + off.x, y * freq + off.y);
                norm += amp;
                amp *= 0.5f;
                freq *= 2.03f;
            }
            return sum / norm;
        }

        static float Ridged(float x, float y, int octaves, Vector2 off)
        {
            float amp = 0.5f, freq = 1f, sum = 0f, norm = 0f;
            for (int i = 0; i < octaves; i++)
            {
                float n = Mathf.PerlinNoise(x * freq + off.x, y * freq + off.y);
                n = 1f - Mathf.Abs(n * 2f - 1f);
                n *= n;
                sum += amp * n;
                norm += amp;
                amp *= 0.5f;
                freq *= 2.1f;
            }
            return sum / norm;
        }

        /// <summary>u, v у діапазоні 0..1. Повертає нормалізовану висоту.</summary>
        public float Sample(float u, float v)
        {
            float x = u * 2f - 1f;
            float z = v * 2f - 1f;
            float d = Mathf.Sqrt(x * x + z * z);

            // Берегова лінія — коло, «розхитане» шумом.
            float warp = (Fbm(u * 3f, v * 3f, 3, offWarp) - 0.5f) * 0.35f;
            float mask = 1f - HeightField.Smooth(0.55f, 0.92f, d + warp);

            // Пагорби + гірські хребти (далі від центру).
            float baseH = Fbm(u * 4f, v * 4f, 5, offBase);
            float ridge = Ridged(u * 3f, v * 3f, 4, offRidge);
            float mountains = ridge * Smooth(0.18f, 0.55f, d) * Smooth(0f, 0.5f, mask);

            float land = 0.20f + baseH * 0.14f + mountains * 0.55f;
            float h = Mathf.Lerp(0.04f, land, mask);

            // Фйорд: звивиста долина з півдня вглиб острова.
            float cx = -0.25f + 0.22f * Mathf.Sin(z * 3.2f);
            float dist = Mathf.Abs(x - cx);
            float fade = 1f - Smooth(0.05f, 0.40f, z);
            float carve = (1f - Smooth(0.04f, 0.10f, dist)) * fade;
            h = Mathf.Lerp(h, 0.06f, carve);

            // Рівне плато під село в центрі карти.
            float village = 1f - Smooth(VillageFlatRadius, VillageBlendRadius, d);
            h = Mathf.Lerp(h, VillageLevel, village);

            return Mathf.Clamp01(h);
        }
    }
}
