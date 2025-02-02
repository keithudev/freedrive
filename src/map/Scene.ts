import { Color, DoubleSide, HemisphereLight, Mesh, MeshBasicMaterial, PerspectiveCamera, Plane, PlaneGeometry, Scene, WebGLRenderer } from "three";
import Camera from "./Camera";

class MainScene {
    private _scene: Scene;
    private _camera!: PerspectiveCamera;
    private _cameraEntity!: Camera;

    constructor() {
        this._scene = new Scene();

        this._scene.background = new Color(0x87CEEB);
    }

    public load = (renderer: WebGLRenderer) => {
        this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.position.set(0, 2, 5);

        const light = new HemisphereLight(0xffffbb, 0x080820, 1);
        this._scene.add(light);

        this._cameraEntity = new Camera(this._camera, renderer.domElement);

        const groundGeometry = new PlaneGeometry(100,100);
        const groundMaterial = new MeshBasicMaterial({color: 0x228b22});
        const gorundMesh = new Mesh(groundGeometry, groundMaterial);
        gorundMesh.rotation.x = -Math.PI / 2;
        this._scene.add(gorundMesh);
    }

    public update(): void {
        if (this._cameraEntity) {
            this._cameraEntity.update();
        }
    }

    public get scene(): Scene {
        return this._scene;
    }

    public get camera(): PerspectiveCamera {
        return this._camera;
    }
}
export default MainScene;