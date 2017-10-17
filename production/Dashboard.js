
var indexRef = firebase.database().ref().child("changes");
var createProdRef = firebase.database().ref().child("products");
var craetePromoRef = firebase.database().ref().child("promotional content");

function sendReviewProd(){
    alert("product rejected");
}

function listProduct(){
  try {
    createProdRef.child(prodKey).set({
      CONSUMABLES: productListing.CONSUMABLES ,
       CODE:productListing.CODE,
       PRICING: productListing.PRICING,
       PRICING_UNIT: productListing.PRICING_UNIT,
       DESCRIPTION:productListing.DESCRIPTION,
       IMAGE: productListing.IMAGE
    });
  } catch (e) {

  } finally {
    indexRef.child(prodKey).remove();
  }

}

function sendReviewPromo(){
    alert('promo rejected');
}

function listPromo(){
  try {
    createProdRef.child(promoKey).set({
      TITLE: promoContent.TITLE,
      DESCRIPTION: promoContent.DESCRIPTION,
      IMAGE: promoContent.IMAGE
    });
  } catch (e) {
    alert("Error creating promo: "+ e.toString);
  } finally {
    indexRef.child(promoKey).remove();
  }

}

function getProduct0() {

    var myid = document.getElementById('0').id;
    localStorage.setItem('first', myid);
    window.location.href = "e_commerce.html?theId=" + myid;
}


var int = 0;
var stuff;
var promoContent =new Object();
var productListing = new Object();
var prodKey;
var promoKey;
    function supportPromoModal(my){
     var ref =   firebase.database().ref().child("changes/"+my);
     ref.once("value").then(function(snapshot) {
       //promoContent.key = Object.keys(snapshot.val())[0];
       console.log(my);
       promoContent.TITLE =snapshot.val().TITLE;
       promoContent.DESCRIPTION = snapshot.val().DESCRIPTION;
       promoContent.IMAGE= snapshot.val().IMAGE;
       promoKey = my;
         document.getElementById("promo_title").innerHTML = snapshot.val().TITLE;
         document.getElementById("promo_desc").innerHTML = snapshot.val().DESCRIPTION;
         document.getElementById("promo_preview").src = snapshot.val().IMAGE;
     });
    }

    function supportListingModal(my){
        var ref =   firebase.database().ref().child("changes/"+my);
        ref.once("value").then(function(snapshot) {
            productListing.CONSUMABLES = snapshot.val().CONSUMABLES;
            productListing.CODE = snapshot.val().CODE;
            productListing.PRICING = snapshot.val().PRICING;
            productListing.PRICING_UNIT = snapshot.val().PRICING_UNIT;
            productListing.DESCRIPTION = snapshot.val().DESCRIPTION
            productListing.IMAGE = snapshot.val().IMAGE;
            prodKey = my;

            document.getElementById("prod_title").innerHTML = snapshot.val().CONSUMABLES;
            document.getElementById("prod_code").innerHTML = snapshot.val().CODE;
            document.getElementById("prod_pricing").innerHTML = snapshot.val().PRICING;
            document.getElementById("prod_pricing_unit").innerHTML = snapshot.val().PRICING_UNIT;
            document.getElementById("prod_description").innerHTML = snapshot.val().DESCRIPTION;
            document.getElementById("prod_image").src = snapshot.val().IMAGE;
        });
    }

indexRef.on("child_added", snap => {

    var Who = snap.child("WHO").val();
    var key = snap.key;

    var When = new Date( snap.child("WHEN").val());
    var What = snap.child("WHAT").val();
    var Where = snap.child("WHERE").val();

    if(Where == "promotional content"){
        //make the button go to promoModal
        $("#dashboard_body").append("<tr><td>"+What+" </td><td>"+Where+"</td><td >" + Who+ "</td><td>" + When +
        "</td><td><button id=" + key + " type='button' class='btn btn-info btn-lg' onclick='supportPromoModal(this.id)' data-toggle='modal' data-target='#promoModal'>approve/decline</button></td></tr>");
    }else if(Where == "product listing"){
        //make button go to to listingModal
        $("#dashboard_body").append("<tr ><td>"+What+" </td><td>"+Where+"</td><td >" + Who+ "</td><td>" + When +
        "</td><td><button id=" + key + " type='button' class='btn btn-info btn-lg' onclick='supportListingModal(this.id)' data-toggle='modal' data-target='#prodModal'>approve/decline</button></td></tr>");
    }
   // console.log(new Date(When));




});
