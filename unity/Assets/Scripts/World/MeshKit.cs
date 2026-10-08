using System.Collections.Generic;
using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Мінімальний набір для процедурних low-poly мешів (плоске затінення: кожен трикутник має свої вершини).
    /// </summary>
    public static class MeshKit
    {
        /// <summary>
        /// Додає трикутник. Порядок вершин автоматично підбирається так, щоб лицьова сторона
        /// дивилась у бік <paramref name="outward"/>.
        /// </summary>
        public static void Tri(List<Vector3> v, List<int> t, Vector3 a, Vector3 b, Vector3 c, Vector3 outward)
        {
            if (Vector3.Dot(Vector3.Cross(b - a, c - a), outward) > 0f)
            {
                Vector3 tmp = b; b = c; c = tmp;
            }
            int i = v.Count;
            v.Add(a); v.Add(b); v.Add(c);
            t.Add(i); t.Add(i + 1); t.Add(i + 2);
        }

        /// <summary>Зрізаний конус (або конус, якщо rTop ≈ 0) з основою в baseCenter.</summary>
        public static void Frustum(List<Vector3> v, List<int> t, Vector3 baseCenter, float r0, float r1, float h, int sides, bool bottomCap)
        {
            for (int i = 0; i < sides; i++)
            {
                float a0 = i * Mathf.PI * 2f / sides;
                float a1 = (i + 1) * Mathf.PI * 2f / sides;
                Vector3 b0 = baseCenter + new Vector3(Mathf.Cos(a0) * r0, 0f, Mathf.Sin(a0) * r0);
                Vector3 b1 = baseCenter + new Vector3(Mathf.Cos(a1) * r0, 0f, Mathf.Sin(a1) * r0);
                Vector3 t0 = baseCenter + new Vector3(Mathf.Cos(a0) * r1, h, Mathf.Sin(a0) * r1);
                Vector3 t1 = baseCenter + new Vector3(Mathf.Cos(a1) * r1, h, Mathf.Sin(a1) * r1);
                float am = (a0 + a1) * 0.5f;
                Vector3 mid = new Vector3(Mathf.Cos(am), 0f, Mathf.Sin(am));

                Tri(v, t, b0, b1, t0, mid);
                if (r1 > 0.001f) Tri(v, t, b1, t1, t0, mid);
                if (bottomCap) Tri(v, t, baseCenter, b1, b0, Vector3.down);
            }
        }

        public static Mesh Build(List<Vector3> v, List<int> t)
        {
            var m = new Mesh();
            if (v.Count > 65000) m.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
            m.SetVertices(v);
            m.SetTriangles(t, 0);
            m.RecalculateNormals();
            m.RecalculateBounds();
            return m;
        }
    }
}
