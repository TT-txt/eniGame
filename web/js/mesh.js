function createSkybox() {
    let materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('textures/skybox/right.png');
    const texture_bk = new THREE.TextureLoader().load('textures/skybox/left.png');
    const texture_up = new THREE.TextureLoader().load('textures/skybox/top.png');
    const texture_dn = new THREE.TextureLoader().load('textures/skybox/bottom.png');
    const texture_rt = new THREE.TextureLoader().load('textures/skybox/front.png');
    const texture_lf = new THREE.TextureLoader().load('textures/skybox/back.png');

    //Not affected by light
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    let skyboxGeo = new THREE.BoxBufferGeometry(35, 35, 35);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.position.set(0, 0, 0);
    scene.add(skybox);
}