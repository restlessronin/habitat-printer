export class STLSlicer {
  static async toGcode(loadPath, vueApp) {
    kiri
      .newEngine()
      .setListener(vueApp.slicerMessage)
      .load(loadPath)
      .then(eng =>
        eng.setProcess({
          sliceShells: 1,
          sliceFillSparse: 0.25,
          sliceTopLayers: 2,
          sliceBottomLayers: 2,
        })
      )
      .then(eng =>
        eng.setDevice({
          gcodePre: ['M82', 'M104 S220'],
          gcodePost: ['M107'],
        })
      )
      .then(eng => eng.slice())
      .then(eng => eng.prepare())
      .then(eng => eng.export())
      .then(vueApp.displayGcode);
  }
}

window.STLSlicer = STLSlicer;
