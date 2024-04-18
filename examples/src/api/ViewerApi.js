class  ViewerApi {
    constructor(viewer) {
        this._viewer = viewer
    }

    addAMapImagery(){
        let baseLayer = DC.ImageryLayerFactory.createImageryLayer(DC.ImageryType.AMAP,{
            style: 'img',
            crs: "WGS84"
        })
        this._viewer.addBaseLayer(baseLayer);
        return this
    }
}


export  default  ViewerApi