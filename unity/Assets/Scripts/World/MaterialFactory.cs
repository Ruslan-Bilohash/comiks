using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Створює матеріали у коді (URP Lit; якщо URP немає — Standard).
    /// Так світ збирається з порожньої сцени без жодного ассета.
    /// </summary>
    public static class MaterialFactory
    {
        static Shader lit;

        static Shader LitShader
        {
            get
            {
                if (lit == null) lit = Shader.Find("Universal Render Pipeline/Lit");
                if (lit == null) lit = Shader.Find("Standard");
                return lit;
            }
        }

        public static Material Lit(Color color, float smoothness = 0.1f, float metallic = 0f)
        {
            var m = new Material(LitShader);
            SetColor(m, color);
            if (m.HasProperty("_Smoothness")) m.SetFloat("_Smoothness", smoothness);
            if (m.HasProperty("_Glossiness")) m.SetFloat("_Glossiness", smoothness);
            if (m.HasProperty("_Metallic")) m.SetFloat("_Metallic", metallic);
            return m;
        }

        public static void SetColor(Material m, Color c)
        {
            if (m.HasProperty("_BaseColor")) m.SetColor("_BaseColor", c);
            if (m.HasProperty("_Color")) m.SetColor("_Color", c);
        }

        public static void SetTexture(Material m, Texture tex)
        {
            if (m.HasProperty("_BaseMap")) m.SetTexture("_BaseMap", tex);
            if (m.HasProperty("_MainTex")) m.SetTexture("_MainTex", tex);
        }

        public static void SetEmission(Material m, Color hdr)
        {
            m.EnableKeyword("_EMISSION");
            m.globalIlluminationFlags = MaterialGlobalIlluminationFlags.None;
            if (m.HasProperty("_EmissionColor")) m.SetColor("_EmissionColor", hdr);
        }

        public static Material Emissive(Color baseColor, Color hdr)
        {
            var m = Lit(baseColor, 0.2f);
            SetEmission(m, hdr);
            return m;
        }

        /// <summary>Напівпрозорий матеріал (URP Lit, Surface = Transparent, Alpha blend).</summary>
        public static Material Transparent(Color color, float smoothness)
        {
            var m = Lit(color, smoothness);
            if (m.HasProperty("_Surface"))
            {
                m.SetFloat("_Surface", 1f);
                m.SetFloat("_Blend", 0f);
                m.SetFloat("_SrcBlend", (float)UnityEngine.Rendering.BlendMode.SrcAlpha);
                m.SetFloat("_DstBlend", (float)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                if (m.HasProperty("_SrcBlendAlpha")) m.SetFloat("_SrcBlendAlpha", 1f);
                if (m.HasProperty("_DstBlendAlpha")) m.SetFloat("_DstBlendAlpha", (float)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                m.SetFloat("_ZWrite", 0f);
                m.EnableKeyword("_SURFACE_TYPE_TRANSPARENT");
                m.DisableKeyword("_ALPHAPREMULTIPLY_ON");
                m.SetOverrideTag("RenderType", "Transparent");
                m.SetShaderPassEnabled("ShadowCaster", false);
            }
            m.renderQueue = (int)UnityEngine.Rendering.RenderQueue.Transparent;
            return m;
        }
    }
}
