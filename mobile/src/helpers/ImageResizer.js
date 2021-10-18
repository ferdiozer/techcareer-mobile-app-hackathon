import ImageResizer from 'react-native-image-resizer';

export default ({ data, uri, size = 360, quality = 100, mode = 'contain' }) => {
    let ImagePath = data ? 'data:image/jpeg;base64,' + data : uri;
    return ImageResizer.createResizedImage(ImagePath, size, size, 'PNG', quality, 0, undefined, false, { mode, onlyScaleDown: false })
}