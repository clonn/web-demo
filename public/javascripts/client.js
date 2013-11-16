var socket = io.connect();

socket.on('broadcast:image', function (data) {
    //alert("Welcome to login!!!");
    console.log(data);
    var node = document.getElementsByTagName("img")[0];
    node.src = data.imageUrl
});

