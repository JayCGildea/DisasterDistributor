<script>
$( document ).ready(function() {
    $(".button-collapse").sideNav();

    var successHandler = function(position)  {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        map = new google.maps.Map(document.getElementById("mapHolder"),{
                zoom: 17,
                center: new google.maps.LatLng(latitude, longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        );
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successHandler);
    }
    );
</script>