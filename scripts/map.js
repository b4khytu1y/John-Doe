ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [43, 76],
            zoom: 3

         }, ),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        
          
        
        myPlacemarkWithContent = new ymaps.Placemark([43.23575608223972, 76.90987354603291], { 
            balloonContent: 'New York',
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'images/logotype.png',
            iconImageSize: [25, 25],
           iconImageOffset: [-5, -38],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout

        });
        
    myMap.geoObjects

        .add(myPlacemarkWithContent);
    myMap.setBounds(myMap.geoObjects.getBounds());
        {

        }
});

