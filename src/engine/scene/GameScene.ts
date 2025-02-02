import { BoxGeometry, HemisphereLight, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import GameEntity from "../entities/GameEntity";
import MainScene from "../../map/Scene";

class GameScene {
    private static _instance = new GameScene();
    public static get instance() {
        return this._instance;
    }
    private _width: number;
    private _height: number;
    private _renderer: WebGLRenderer;
    private _mainScene!: MainScene;


    private constructor() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width, this._height);

        const targetElement = document.querySelector<HTMLDivElement>("#app");
        if (!targetElement) {
            throw "unable to find target element";
        }

        targetElement.appendChild(this._renderer.domElement);

        this._mainScene = new MainScene();


        // listen to size change
        window.addEventListener("resize", this.resize, false)


    }

    public load() {
        this._mainScene.load(this._renderer);
    }

    private resize = () => {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize(this._width, this._height);
        this._mainScene.camera.aspect = this._width / this._height;
        this._mainScene.camera.updateProjectionMatrix();
    }


    public render = () => {
        requestAnimationFrame(this.render);
        this._mainScene.update();

        this._renderer.render(this._mainScene.scene, this._mainScene.camera);
    }
}

export default GameScene;