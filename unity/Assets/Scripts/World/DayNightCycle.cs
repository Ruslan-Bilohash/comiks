using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Цикл дня й ночі: сонце, місяць, небо, туман, амбієнт; вночі світяться вікна.
    /// timeOfDay: 0 — північ, 0.25 — світанок, 0.5 — полудень, 0.75 — захід.
    /// </summary>
    public sealed class DayNightCycle : MonoBehaviour
    {
        [Range(0f, 1f)] public float timeOfDay = 0.30f;
        public float dayLengthSeconds = 300f;
        public Material windowMaterial;
        public float waterLevel = 30f;

        Light sun;
        Light moon;
        Material sky;
        Camera cam;

        public string Clock
        {
            get
            {
                float hours = timeOfDay * 24f;
                int hh = Mathf.FloorToInt(hours) % 24;
                int mm = Mathf.FloorToInt((hours - Mathf.Floor(hours)) * 60f);
                return $"{hh:00}:{mm:00}";
            }
        }

        void Awake()
        {
            sun = MakeLight("Sun", LightShadows.Soft);
            moon = MakeLight("Moon", LightShadows.None);
            moon.color = new Color(0.55f, 0.65f, 1f);
            RenderSettings.sun = sun;

            var skyShader = Shader.Find("Skybox/Procedural");
            if (skyShader != null)
            {
                sky = new Material(skyShader);
                sky.SetFloat("_SunSize", 0.045f);
                sky.SetFloat("_SunSizeConvergence", 5f);
                RenderSettings.skybox = sky;
            }

            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Trilight;
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.ExponentialSquared;
            Apply();
        }

        Light MakeLight(string lightName, LightShadows shadows)
        {
            var go = new GameObject(lightName);
            go.transform.SetParent(transform, false);
            var l = go.AddComponent<Light>();
            l.type = LightType.Directional;
            l.shadows = shadows;
            l.shadowStrength = 0.9f;
            return l;
        }

        void Update()
        {
            float speed = InputProxy.FastTimeHeld() ? 40f : 1f;
            timeOfDay = (timeOfDay + Time.deltaTime * speed / dayLengthSeconds) % 1f;
            Apply();
        }

        void Apply()
        {
            float angle = timeOfDay * 360f - 90f;
            float height = Mathf.Sin(angle * Mathf.Deg2Rad); // висота сонця: -1..1
            float day = HeightField.Smooth(-0.05f, 0.25f, height);
            float golden = (1f - HeightField.Smooth(0f, 0.45f, height)) * HeightField.Smooth(-0.15f, 0.05f, height);

            sun.transform.rotation = Quaternion.Euler(angle, -35f, 0f);
            sun.color = Color.Lerp(new Color(1f, 0.96f, 0.88f), new Color(1f, 0.52f, 0.22f), golden);
            sun.intensity = Mathf.Lerp(0f, 1.25f, day);
            sun.enabled = height > -0.08f;

            moon.transform.rotation = Quaternion.Euler(angle + 180f, -35f, 0f);
            moon.intensity = (1f - day) * 0.3f;

            RenderSettings.ambientSkyColor = Color.Lerp(new Color(0.03f, 0.05f, 0.12f), new Color(0.45f, 0.60f, 0.85f), day);
            RenderSettings.ambientEquatorColor = Color.Lerp(new Color(0.03f, 0.04f, 0.08f), new Color(0.50f, 0.55f, 0.55f), day);
            RenderSettings.ambientGroundColor = Color.Lerp(new Color(0.01f, 0.01f, 0.02f), new Color(0.25f, 0.22f, 0.18f), day);

            Color fog = Color.Lerp(new Color(0.02f, 0.03f, 0.07f), new Color(0.60f, 0.72f, 0.85f), day);
            fog = Color.Lerp(fog, new Color(0.95f, 0.55f, 0.35f), golden * 0.35f);
            float density = 0.0016f;

            if (cam == null) cam = Camera.main;
            if (cam != null && cam.transform.position.y < waterLevel)
            {
                fog = Color.Lerp(fog, new Color(0.05f, 0.30f, 0.38f) * Mathf.Lerp(0.15f, 1f, day), 0.9f);
                density = 0.05f;
            }
            RenderSettings.fogColor = fog;
            RenderSettings.fogDensity = density;

            if (sky != null)
            {
                sky.SetFloat("_Exposure", Mathf.Lerp(0.04f, 1.2f, day));
                sky.SetFloat("_AtmosphereThickness", Mathf.Lerp(0.7f, 1.0f, day) + golden * 0.5f);
                sky.SetColor("_SkyTint", Color.Lerp(new Color(0.4f, 0.45f, 0.6f), new Color(0.5f, 0.5f, 0.5f), day));
            }

            if (windowMaterial != null)
            {
                float night = 1f - HeightField.Smooth(-0.1f, 0.2f, height);
                MaterialFactory.SetEmission(windowMaterial, new Color(1f, 0.78f, 0.42f) * (night * 2.4f));
            }
        }
    }
}
