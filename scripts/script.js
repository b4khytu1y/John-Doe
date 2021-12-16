ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [30, 20],
            zoom: 3

         }, ),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        
        myPlacemark = new ymaps.Placemark([43.235009, 76.909964], {
            balloonContent: 'Almaty|Manas street, 34A'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/iconMarker.png',
            iconImageSize: [25, 25], 
          
            
        }),

         
        myPlacemarkWithContent = new ymaps.Placemark([40.760375, -73.972754], { 
            balloonContent: 'New York',
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'images/iconMarker.png',
            iconImageSize: [25, 25],
           iconImageOffset: [-5, -38],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
        });
        
    myMap.geoObjects
        .add(myPlacemark)

        .add(myPlacemarkWithContent);
    myMap.setBounds(myMap.geoObjects.getBounds());
        {

        }
});

