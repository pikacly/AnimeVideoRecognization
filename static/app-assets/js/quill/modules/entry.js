import { ImageImport } from './ImageImport.js';
import { ImageResize } from './ImageResize.js';

Quill.register('../modules/imageImport', ImageImport);
Quill.register('../modules/imageResize', ImageResize);
this.quill = new Quill('#Editor', {
  modules: {
    toolbar: [
      [{ 'size': ['small', false, 'large'] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image']
    ],
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    },
    imageImport: true,
    imageResize: {
      displaySize: true
    }
  },
  placeholder: 'Paste or drag images here',
  theme: 'snow'
});