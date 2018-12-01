const { ArToolkitContext, ArToolkitSource } = THREEx;

export const initializeArToolkit = (renderer, camera, onRenderFcts) => {
  ArToolkitContext.baseURL = '../';
  const arToolkitSource = new ArToolkitSource({
    // to read from the webcam
    sourceType: 'webcam',
  });

  // handle resize
  arToolkitSource.init(() => {
    arToolkitSource.onResize(renderer.domElement);
  });
  window.addEventListener('resize', () => {
    arToolkitSource.onResize(renderer.domElement);
  });

  // create atToolkitContext
  const arToolkitContext = new ArToolkitContext({
    cameraParametersUrl: '../../assets/camera_para.dat',
    detectionMode: 'mono',
    maxDetectionRate: 30,
    canvasWidth: 80 * 3,
    canvasHeight: 60 * 3,
  });

  // initialize it
  arToolkitContext.ingit it(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  // update artoolkit on every frame
  onRenderFcts.push(() => {
    if (arToolkitSource.ready === false) return;
    arToolkitContext.update(arToolkitSource.domElement);
  });

  return arToolkitContext;
};
