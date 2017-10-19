
var indexRef = firebase.database().ref().child("products").orderByKey();


$("#table_body").on('click','.delete-btn', function(e){
    alert('hello');
});

function getProduct0() {

    var myid = document.getElementById('0').id;
    localStorage.setItem('first', myid);
    window.location.href = "e_commerce.html?theId=" + myid;
}


var int=0;

indexRef.on("child_added", snap => {
    int= int +1;

	var Code = snap.child("CODE").val();
	var Name = snap.child("CONSUMABLES").val();
	var Description = snap.child("DESCRIPTION").val();
	var Image = snap.child("IMAGE").val();
	var Pricing = snap.child("PRICING").val();
	var PricingUnit = snap.child("PRICING UNIT").val();


	$("#table_body").append("<tr><td> <div class='view-first'>  <image src = " + Image + " width ='80px' height='80px'></div> </td><td>" + Name + "</td><td>" + Description + "</td><td>R " + Pricing +
	"</td><td><button class='btn-success' style ='background-color:#02b29d;' onclick = 'getCode(this.id)'  id="+Code+">Edit Item</button></td></tr>");


});
