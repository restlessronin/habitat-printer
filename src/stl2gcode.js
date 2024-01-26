export default async function stl2gcode(loadPath) {
  const eng = await kiri.newEngine().load(loadPath);

  await eng.setProcess({
    sliceShells: 1,
    sliceFillSparse: 0.25,
    sliceTopLayers: 2,
    sliceBottomLayers: 2,
  });

  await eng.setDevice({
    gcodePre: ['M82', 'M104 S220'],
    gcodePost: ['M107'],
  });

  await eng.slice();
  await eng.prepare();
  return await eng.export();
}
