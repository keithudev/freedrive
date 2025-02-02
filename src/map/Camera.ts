import { PerspectiveCamera } from "three";
import { PointerLockControls } from "three/examples/jsm/Addons.js";

class Camera {
    private _controls: PointerLockControls;

    constructor(camera: PerspectiveCamera, domElement: HTMLElement) {
        this._controls = new PointerLockControls(camera, domElement);

        domElement.addEventListener("click", () => {
            this._controls.lock();
        }) 

        this._controls.addEventListener("lock", () => {
            console.log("Pointer locked");
          });
      
          this._controls.addEventListener("unlock", () => {
            console.log("Pointer unlocked");
          });
    }

    public update(): void {

    }

    public get controls(): PointerLockControls {
        return this._controls;
    }
}

export default Camera;