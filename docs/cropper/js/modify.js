window.onload = function () {

  'use strict';

  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');

  var options = {
    aspectRatio: 9 / 16,
    viewMode:2,
    preview: '.img-preview',
    ready: function (e) {
      console.log(e.type);
      //获取画布尺寸
      var data = {
        method: "getCanvasData",
        target: "#putData",
        option: undefined,
        secondOption: undefined
      };
      var respect = dealPic(data);
      //如果是横向的图片，就翻转90度
      if(respect.width>respect.height){

      }
      var data = {
        method: "getContainerData",
        target: "#putData",
        option: undefined,
        secondOption: undefined
      };
      dealPic(data);
      //设置croper大小
      data = {
        method: "setCropBoxData",
        target: "#putData",
        option: undefined,
        secondOption: undefined
      };
      dealPic(data);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;
      //实施croper
      data = {
        method: "getCroppedCanvas",
        target: null,
        option: '{ "maxWidth": 4096, "maxHeight": 4096 }',
        secondOption: undefined
      };
      dealPic(data);
      console.log(e.type); 
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/jpeg';
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageURL;

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // 创建一个画布
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Download
  if (typeof download.download === 'undefined') {
    download.className += ' disabled';
  }
  // Methods
  var dealPic = function (data) {

    var cropped;
    var result;
    var input;
    
    cropped = cropper.cropped;
  
    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);
 

        //只有设置函数才需要进这里面，把input.value作为参数，如果是get方法，必须设置一个option，哪怕是空
        if (data.method === 'setCropBoxData') {
          try {
            
            data.option = JSON.parse(input.value);
           
          } catch (e) {
            console.log(e.message);
          }
        }
      }
      
      switch (data.method) {
        case 'getCroppedCanvas':
          try {
            
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }
          console.log(data.option);
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = cropper[data.method](data.option, data.secondOption);
      
  
      switch (data.method) {
        case 'getCroppedCanvas':
          if (result) {
            $('.img-container').addClass('sr-only');
            lCropperInstance = result.toDataURL("image/png");
            $('#img-output img').attr('src',lCropperInstance);
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
          
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };


  // 导入图像文件
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
};
