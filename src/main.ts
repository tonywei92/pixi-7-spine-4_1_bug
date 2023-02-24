import * as PIXI from "pixi.js";
import "pixi-spine";
import { Spine } from "pixi-spine";

class Main {
  app: PIXI.Application;
  constructor() {
    this.app = new PIXI.Application({
      width: this.WIDTH,
      height: this.HEIGHT,
      backgroundColor: 0x000,
    });

    const element = document.getElementById("app")!;
    element.appendChild(this.app.view as any);
    this.initialize();
  }

  async initialize() {
    const rocketSpineAsset = await PIXI.Assets.load("/rocket/rocket.json");

    const spaceshipSpineAsset = await PIXI.Assets.load(
      "/spaceship/spaceship.json"
    );

    const container = new PIXI.Container();
    container.position.set(500, 500);

    const rocketSpine = new Spine(rocketSpineAsset.spineData);
    rocketSpine.state.setAnimation(0, "rocket_animation", true);
    rocketSpine.scale.set(0.32);
    const spaceshipSpine = new Spine(spaceshipSpineAsset.spineData);
    spaceshipSpine.state.setAnimation(0, "spaceship_flying_bunny", true);
    spaceshipSpine.scale.set(0.32);

    // work
    container.addChild(rocketSpine).position.set(5, -140);

    // does not work
    container.addChild(spaceshipSpine).position.set(5, -140);

    // the error is:
    // Uncaught TypeError: Cannot read properties of null (reading 'baseTexture')
    // at set texture [as texture] (MeshMaterial.ts:106:41)
    // at set texture [as texture] (Mesh.ts:253:50)
    // at Spine4.setMeshRegion (SpineBase.ts:517:14)
    // at Spine4.update (SpineBase.ts:390:30)
    // at Spine4.autoUpdateTransform (SpineBase.ts:535:18)
    // at _Container.updateTransform (Container.ts:448:23)
    // at _Container.updateTransform (Container.ts:448:23)
    // at ObjectRendererSystem.render (ObjectRendererSystem.ts:91:27)
    // at _Renderer.render (Renderer.ts:435:29)
    // at _Application.render (Application.ts:136:23)

    this.app.stage.addChild(container);
  }

  get WIDTH() {
    return 1920;
  }

  get HEIGHT() {
    return 1080;
  }
}

new Main();
