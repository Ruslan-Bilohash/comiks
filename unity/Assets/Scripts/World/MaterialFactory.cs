using UnityEngine;

namespace Comiks.World
{
    /// <summary>Створює прості матеріали у коді (Standard; якщо в проєкті є URP — URP Lit).</summary>
    public static class MaterialFactory
    {
        public static Material Lit(Color color, float smoothness = 0.1f)
        {
            Shader shader = Shader.Find("Universal Render Pipeline/Lit");
            if (shader == null) shader = Shader.Find("Standard");

            var m = new Material(shader);
            if (m.HasProperty("_BaseColor")) m.SetColor("_BaseColor", color);
            if (m.HasProperty("_Color")) m.SetColor("_Color", color);
            if (m.HasProperty("_Smoothness")) m.SetFloat("_Smoothness", smoothness);
            if (m.HasProperty("_Glossiness")) m.SetFloat("_Glossiness", smoothness);
            return m;
        }
    }
}
