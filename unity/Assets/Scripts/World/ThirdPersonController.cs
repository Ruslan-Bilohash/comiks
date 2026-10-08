using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Гравець: ходьба, біг, стрибок і плавання. Рухається відносно камери.
    /// Початок координат об'єкта — ступні, CharacterController висотою 1.8 м.
    /// </summary>
    [RequireComponent(typeof(CharacterController))]
    public sealed class ThirdPersonController : MonoBehaviour
    {
        public Transform cameraTransform;
        public Transform visual;
        public float waterLevel = 30f;

        public float walkSpeed = 5f;
        public float sprintSpeed = 9f;
        public float swimSpeed = 3.2f;
        public float jumpHeight = 1.4f;
        public float gravity = -22f;

        CharacterController cc;
        float velocityY;
        Vector3 spawn;

        public bool InWater => transform.position.y < waterLevel - 0.9f;

        void Awake()
        {
            cc = GetComponent<CharacterController>();
            spawn = transform.position;
        }

        void Update()
        {
            float dt = Time.deltaTime;
            Vector2 input = InputProxy.Move();

            Vector3 forward = Vector3.forward, right = Vector3.right;
            if (cameraTransform != null)
            {
                forward = Vector3.ProjectOnPlane(cameraTransform.forward, Vector3.up).normalized;
                right = Vector3.ProjectOnPlane(cameraTransform.right, Vector3.up).normalized;
            }

            Vector3 wish = forward * input.y + right * input.x;
            if (wish.sqrMagnitude > 1f) wish.Normalize();

            bool swimming = InWater;
            float speed = swimming ? swimSpeed : (InputProxy.SprintHeld() ? sprintSpeed : walkSpeed);

            if (swimming)
            {
                // Виштовхувальна сила: тримаємось грудьми на поверхні.
                float targetY = waterLevel - 1.1f;
                velocityY = (targetY - transform.position.y) * 4f;
                if (InputProxy.JumpPressed()) velocityY = 6f;
            }
            else
            {
                if (cc.isGrounded && velocityY < 0f) velocityY = -2f;
                if (InputProxy.JumpPressed() && cc.isGrounded) velocityY = Mathf.Sqrt(jumpHeight * -2f * gravity);
                velocityY += gravity * dt;
            }

            cc.Move((wish * speed + Vector3.up * velocityY) * dt);

            if (visual != null && wish.sqrMagnitude > 0.01f)
            {
                Quaternion target = Quaternion.LookRotation(wish, Vector3.up);
                visual.rotation = Quaternion.RotateTowards(visual.rotation, target, 720f * dt);
            }

            if (transform.position.y < -50f) Teleport(spawn);
        }

        public void Teleport(Vector3 position)
        {
            cc.enabled = false;
            transform.position = position;
            cc.enabled = true;
            velocityY = 0f;
        }
    }
}
