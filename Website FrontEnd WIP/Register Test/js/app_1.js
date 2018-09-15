function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Parse.initialize("0OykuJcMdWmif83qhHytaZhgRArtOdDU4STnIvcW", "aiAXzwjcLWqv6VxRQaVKggNceM0mH3PD4mtR5ylm");
function logout()
{
    Parse.User.logOut();
    window.location = "login.html";
}
function isLogin()
{
    var currentUser = Parse.User.current();
    if (currentUser) {

    } else
    {
        window.location = "login.html";
        return false;
    }
}
function showLoader(txt)
{

    $.mobile.loading('show', {
        theme: "a",
        text: txt,
        textonly: true,
        textVisible: true
    });
}
function hideLoader()
{

    $.mobile.loading('hide', {
        theme: "a",
        text: '',
        textonly: true,
        textVisible: true
    });
}
function emptyForm(frm_id)
{
    $("#" + frm_id + " input,#" + frm_id + " textarea").val("");
}
function doSignup()
{
    $("#doSignup").click(function () {
        console.log($('#frm_signup').length);
        if ($("#frm_signup").validationEngine('validate'))
        {

            showLoader('Saving..');
            var user = new Parse.User();
            user.set("username", $('#email').val());
            user.set("name", $('#name').val());
            user.set("password", $('#password').val());
            user.set("email", $('#email').val());

            user.signUp(null, {
                success: function (user) {
                    hideLoader();
                    emptyForm('frm_signup');
                    $("#message").html("<div class='success'>We have sent an email to active your account</div>");

                },
                error: function (user, error) {
                    hideLoader();
                    $("#message").html("<div class='error'>" + error.message + "</div>");

                }
            });
        }
    });
}
function doLogin()
{
    $("#doLogin").click(function () {

        if ($("#frm_login").validationEngine('validate'))
        {

            showLoader('Login..');
            Parse.User.logIn($('#email').val(), $('#password').val(), {
                success: function (user) {

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        window.location = "index.html";
                        // $("#message").html("<div class='success'>Logged In</div>");
                    }


                    hideLoader();
                    // Do stuff after successful login.
                },
                error: function (user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                    // The login failed. Check error to see why.
                }
            });
        }
    });
}

function doforgetPassword()
{
    $("#doforgetPassword").click(function () {

        if ($("#frm_forgetpassword").validationEngine('validate'))
        {

            showLoader('requesting..');


            Parse.User.requestPasswordReset($('#email').val(), {
                success: function () {
                    hideLoader();
                    emptyForm('frm_signup');
                    $("#message").append("<div class='success'>We have sent an email to recover your password</div>");
                },
                error: function (error) {
                    hideLoader();
                    $("#message").append("<div class='error'>" + error.message + "</div>");
                }
            });

        }
    });
}

//////////////////////buyers crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add buyer////////////
/*function addBuyer()
 {
 
 isLogin();
 var buyer_obj = null;
 if (window.location.hash) {
 $('#page_title').html('Update Buyer');
 $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_buyer" data-icon="delete">Delete</a></li>');
 $('#nbar ul li').css("width", '25%');
 
 showLoader('Loading..');
 
 var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
 
 var Buyer = Parse.Object.extend("buyers");
 var query = new Parse.Query(Buyer);
 query.get(hash, {
 success: function (buyer) {
 buyer_obj = buyer;
 $("#first_name").val(buyer.attributes.first_name);
 $("#last_name").val(buyer.attributes.last_name);
 $('#status').val(buyer.attributes.status).slider('refresh');
 $("#phone_number").val(buyer.attributes.phone_number);
 $("#cell_number").val(buyer.attributes.cell_number);
 $("#worknumber").val(buyer.attributes.worknumber);
 $("#fax").val(buyer.attributes.fax);
 $("#email").val(buyer.attributes.email);
 $("#address").val(buyer.attributes.address);
 $("#city").val(buyer.attributes.city);
 $("#state").val(buyer.attributes.state);
 $("#zipcode").val(buyer.attributes.zipcode);
 $("#location").val(buyer.attributes.location);
 $("#propertytype").val(buyer.attributes.propertytype).selectmenu("refresh");
 $("#pricerange").val(buyer.attributes.pricerange);
 $("#numofbedrooms").val(buyer.attributes.numofbedrooms);
 $("#numofbaths").val(buyer.attributes.numofbaths);
 $("#pool").val(buyer.attributes.pool);
 $("#notes").val(buyer.attributes.notes);
 $("#property1").val(buyer.attributes.property1);
 $("#property2").val(buyer.attributes.property2);
 $("#property3").val(buyer.attributes.property3);
 $("#property4").val(buyer.attributes.property4);
 $("#property5").val(buyer.attributes.property5);
 $("#facebookid").val(buyer.attributes.facebookid);
 $("#twitterid").val(buyer.attributes.twitterid);
 $("#linkedinid").val(buyer.attributes.linkedinid);
 $("#googleid").val(buyer.attributes.googleid);
 $("#tumblrid").val(buyer.attributes.tumblrid);
 $("#pintrestid").val(buyer.attributes.pintrestid);
 $("#agent").val(buyer.attributes.agent);
 $("#escrow").val(buyer.attributes.escrow);
 $("#lender").val(buyer.attributes.lender);
 $("#homeinspector").val(buyer.attributes.homeinspector);
 $("#appraiser").val(buyer.attributes.appraiser);
 $("#other").val(buyer.attributes.other);
 
 
 hideLoader();
 
 },
 error: function (object, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 }
 });
 }
 
 $("#addBuyer").click(function () {
 
 if ($("#frm_addBuyer").validationEngine('validate'))
 {
 
 var user = Parse.User.current();
 var buyer;
 showLoader('Saving..');
 
 if (buyer_obj)
 {
 buyer = buyer_obj;
 buyer_obj = null;
 } else
 {
 
 var Buyer = Parse.Object.extend("buyers");
 buyer = new Buyer();
 }
 //console.log($('#pool').val());
 //alert(11);
 //return false;
 buyer.set("first_name", $('#first_name').val());
 buyer.set("last_name", $('#last_name').val());
 buyer.set("phone_number", $('#phone_number').val());
 buyer.set("status", $('#status').val());
 buyer.set("cell_number", $('#cell_number').val());
 buyer.set("worknumber", $('#worknumber').val());
 buyer.set("fax", $('#fax').val());
 buyer.set("email", $('#email').val());
 buyer.set("address", $('#address').val());
 buyer.set("city", $('#city').val());
 buyer.set("state", $('#state').val());
 buyer.set("zipcode", $('#zipcode').val());
 buyer.set("location", $('#location').val());
 buyer.set("propertytype", $('#propertytype').val());
 buyer.set("pricerange", $('#pricerange').val());
 buyer.set("numofbedrooms", $('#numofbedrooms').val());
 buyer.set("numofbaths", $('#numofbaths').val());
 buyer.set("pool", $('#pool').val());
 buyer.set("notes", $('#notes').val());
 buyer.set("property1", $('#property1').val());
 buyer.set("property2", $('#property2').val());
 buyer.set("property3", $('#property3').val());
 buyer.set("property4", $('#property4').val());
 buyer.set("property5", $('#property5').val());
 buyer.set("facebookid", $('#facebookid').val());
 buyer.set("twitterid", $('#twitterid').val());
 buyer.set("linkedinid", $('#linkedinid').val());
 buyer.set("googleid", $('#googleid').val());
 buyer.set("tumblrid", $('#tumblrid').val());
 buyer.set("pintrestid", $('#pintrestid').val());
 buyer.set("agent", $('#agent').val());
 buyer.set("escrow", $('#escrow').val());
 buyer.set("lender", $('#lender').val());
 buyer.set("homeinspector", $('#homeinspector').val());
 buyer.set("appraiser", $('#appraiser').val());
 buyer.set("other", $('#other').val());
 
 
 
 buyer.set("user", user);
 buyer.save(null, {
 success: function (buyer)
 {
 window.location = "buyers.html#saved";
 //                    $("#message").html("<div class='success'>Buyer has been  saved successfully. </div>");
 //                    emptyForm('frm_addBuyer');
 //                    hideLoader();
 },
 error: function (user, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 
 }
 
 
 });
 
 
 }
 });
 
 $('#del_buyer').click(function () {
 
 
 if (confirm("Are you sure to delete this record!")) {
 showLoader('Deleting..');
 buyer_obj.destroy({
 success: function (myObject) {
 window.location = "buyers.html#deleted";
 },
 error: function (myObject, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 }
 });
 
 }
 
 
 });
 }*/



//////////////////get buyers/////////////
function getbuyers()
{

    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Buyer = Parse.Object.extend("buyers");
    var query = new Parse.Query(Buyer);
//    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (buyers) {
            //alert(22);
            console.log(buyers.length);
            if (buyers.length > 0)
            {
                $.each(buyers, function (i, buyer) {

                    $('#buyers_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addbuyer.html#' + buyer.id + '">' + buyer.attributes.first_name + ' ' + buyer.attributes.last_name + '</a></li>');

                });
                hideLoader();
            } else
            {
                $(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}

//////////////////////listings crud/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////add listing////////////
/*function addListing()
 {
 
 isLogin();
 var listing_obj = null;
 if (window.location.hash) {
 $('#page_title').html('Update Listing');
 $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_listing" data-icon="delete">Delete</a></li>');
 $('#nbar ul li').css("width", '25%');
 
 showLoader('Loading..');
 
 var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
 
 var Listing = Parse.Object.extend("listings");
 var query = new Parse.Query(Listing);
 query.get(hash, {
 success: function (listing) {
 listing_obj = listing;
 $("#first_name").val(listing.attributes.first_name);
 $("#last_name").val(listing.attributes.last_name);
 $('#status').val(listing.attributes.status).slider('refresh');
 $("#phone_number").val(listing.attributes.phone_number);
 $("#cell_number").val(listing.attributes.cell_number);
 $("#work_number").val(listing.attributes.work_number);
 $("#work_number").val(listing.attributes.work_number);
 $("#fax").val(listing.attributes.fax);
 $("#email").val(listing.attributes.email);
 $("#address").val(listing.attributes.address);
 $("#city").val(listing.attributes.city);
 $("#state").val(listing.attributes.state);
 $("#propertytype").val(listing.attributes.propertytype).selectmenu("refresh");
 $("#listingprice").val(listing.attributes.listingprice);
 $("#numofbedrooms").val(listing.attributes.numofbedrooms);
 $("#numofbaths").val(listing.attributes.numofbaths);
 $("#squarefeet").val(listing.attributes.squarefeet);
 $("#yearbuilt").val(listing.attributes.yearbuilt);
 //                if (listing.attributes.pool == 'on')
 //                {
 //                    $('#pool').prop('checked', true).checkboxradio('refresh');
 //                }
 
 $("#pool").val(listing.attributes.pool);
 //                if (listing.attributes.hottub == 'on')
 //                {
 //                    $('#hottub').prop('checked', true).checkboxradio('refresh');
 //                }
 
 $("#hottub").val(listing.attributes.hottub);
 //                if (listing.attributes.garage == 'on')
 //                {
 //                    $('#garage').prop('checked', true).checkboxradio('refresh');
 //                }
 
 $("#garage").val(listing.attributes.garage);
 //                if (listing.attributes.security == 'on')
 //                {
 //                    $('#security').prop('checked', true).checkboxradio('refresh');
 //                }
 $("#security").val(listing.attributes.security);
 $("#notes").val(listing.attributes.notes);
 $("#heating").val(listing.attributes.heating);
 $("#cooling").val(listing.attributes.cooling);
 $("#fireplaces").val(listing.attributes.fireplaces);
 $("#floortype").val(listing.attributes.floortype);
 $("#garagetype").val(listing.attributes.garagetype);
 $("#lottype").val(listing.attributes.lottype);
 $("#views").val(listing.attributes.views);
 $("#ccr").val(listing.attributes.ccr);
 $("#other").val(listing.attributes.other);
 $("#mlsnum").val(listing.attributes.mlsnum);
 $("#apn").val(listing.attributes.apn);
 $("#lockbox").val(listing.attributes.lockbox);
 $("#showing").val(listing.attributes.showing);
 $("#financing").val(listing.attributes.financing);
 $("#terms").val(listing.attributes.terms);
 $("#agent").val(listing.attributes.agent);
 $("#escrow").val(listing.attributes.escrow);
 $("#lender").val(listing.attributes.lender);
 $("#homeinspector").val(listing.attributes.homeinspector);
 $("#appraiser").val(listing.attributes.appraiser);
 $("#otherescrow").val(listing.attributes.otherescrow);
 
 
 
 hideLoader();
 
 },
 error: function (object, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 }
 });
 }
 
 $("#addListing").click(function () {
 
 if ($("#frm_addListing").validationEngine('validate'))
 {
 
 var user = Parse.User.current();
 var listing;
 showLoader('Saving..');
 
 if (listing_obj)
 {
 listing = listing_obj;
 listing_obj = null;
 } else
 {
 
 var Listing = Parse.Object.extend("listings");
 listing = new Listing();
 }
 
 listing.set("first_name", $('#first_name').val());
 listing.set("last_name", $('#last_name').val());
 listing.set("phone_number", $('#phone_number').val());
 listing.set("status", $('#status').val());
 listing.set("cell_number", $('#cell_number').val());
 listing.set("work_number", $('#work_number').val());
 listing.set("fax", $('#fax').val());
 listing.set("email", $('#email').val());
 listing.set("address", $('#address').val());
 listing.set("city", $('#city').val());
 listing.set("state", $('#state').val());
 listing.set("propertytype", $('#propertytype').val());
 listing.set("listingprice", $('#listingprice').val());
 listing.set("numofbedrooms", $('#numofbedrooms').val());
 listing.set("numofbaths", $('#numofbaths').val());
 listing.set("squarefeet", $('#squarefeet').val());
 listing.set("yearbuilt", $('#yearbuilt').val());
 listing.set("pool", $('#pool').val());
 listing.set("hottub", $('#hottub').val());
 listing.set("garage", $('#garage').val());
 listing.set("security", $('#security').val());
 listing.set("notes", $('#notes').val());
 listing.set("heating", $('#heating').val());
 listing.set("cooling", $('#cooling').val());
 listing.set("fireplaces", $('#fireplaces').val());
 listing.set("floortype", $('#floortype').val());
 listing.set("garagetype", $('#garagetype').val());
 listing.set("lottype", $('#lottype').val());
 listing.set("views", $('#views').val());
 listing.set("ccr", $('#ccr').val());
 listing.set("other", $('#other').val());
 listing.set("mlsnum", $('#mlsnum').val());
 listing.set("apn", $('#apn').val());
 listing.set("lockbox", $('#lockbox').val());
 listing.set("showing", $('#showing').val());
 listing.set("financing", $('#financing').val());
 listing.set("terms", $('#terms').val());
 listing.set("agent", $('#agent').val());
 listing.set("escrow", $('#escrow').val());
 listing.set("lender", $('#lender').val());
 listing.set("homeinspector", $('#homeinspector').val());
 listing.set("appraiser", $('#appraiser').val());
 listing.set("other", $('#otherescrow').val());
 
 
 listing.set("user", user);
 listing.save(null, {
 success: function (listing)
 {
 window.location = "listings.html#saved";
 //                    $("#message").html("<div class='success'>Listing has been  saved successfully. </div>");
 //                    emptyForm('frm_addListing');
 //                    hideLoader();
 },
 error: function (user, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 
 }
 
 
 });
 
 
 }
 });
 
 $('#del_listing').click(function () {
 
 
 if (confirm("Are you sure to delete this record!")) {
 showLoader('Deleting..');
 listing_obj.destroy({
 success: function (myObject) {
 window.location = "listings.html#deleted";
 },
 error: function (myObject, error) {
 $("#message").html("<div class='error'>" + error.message + "</div>");
 hideLoader();
 }
 });
 
 }
 
 
 });
 }*/

//////////////////get listings/////////////
function getlistings()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Listing = Parse.Object.extend("listings");
    var query = new Parse.Query(Listing);
//    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (listings) {
            if (listings.length > 0)
            {
                $.each(listings, function (i, listing) {

                    $('#listings_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addlisting.html#' + listing.id + '">' + listing.attributes.address + ' ' + listing.attributes.first_name + ' ' + listing.attributes.last_name + '</a></li>');

                });
                hideLoader();
            } else
            {
                $(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}

//////////////////////listings crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add listing////////////
function addListing()
{

    isLogin();
    var listing_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Listing');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_listing" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Listing = Parse.Object.extend("listings");
        var query = new Parse.Query(Listing);
        query.get(hash, {
            success: function (listing) {
                listing_obj = listing;
                $("#first_name").val(listing.attributes.first_name);
                $("#last_name").val(listing.attributes.last_name);
                $('#status').val(listing.attributes.status).slider('refresh');
                $("#phone_number").val(listing.attributes.phone_number);
                $("#cell_number").val(listing.attributes.cell_number);
                $("#work_number").val(listing.attributes.work_number);
                $("#work_number").val(listing.attributes.work_number);
                $("#fax").val(listing.attributes.fax);
                $("#email").val(listing.attributes.email);
                $("#address").val(listing.attributes.address);
                $("#city").val(listing.attributes.city);
                $("#state").val(listing.attributes.state);
                $("#propertytype").val(listing.attributes.propertytype).selectmenu("refresh");
                $("#listingprice").val(listing.attributes.listingprice);
//                var d = listing.attributes.listingexp;
//                var curr_date = d.getDate();
//                var curr_month = d.getMonth() + 1;
//                var curr_year = d.getFullYear();
                var now = new Date(listing.attributes.listingexp);

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $('#listingexp').val(today);

                // $("#listingexp").val(new Date(curr_year+ "-" +pad(curr_month, 2) + "-" + pad(curr_date, 2) ));
                $("#numofbedrooms").val(listing.attributes.numofbedrooms);
                $("#numofbaths").val(listing.attributes.numofbaths);
                $("#squarefeet").val(listing.attributes.squarefeet);
                $("#yearbuilt").val(listing.attributes.yearbuilt);
                $("#pool").val(listing.attributes.pool);
                $("#hottub").val(listing.attributes.hottub);
                $("#garage").val(listing.attributes.garage);
                $("#security").val(listing.attributes.security);
                $("#notes").val(listing.attributes.notes);
                $("#heating").val(listing.attributes.heating);
                $("#cooling").val(listing.attributes.cooling);
                $("#fireplaces").val(listing.attributes.fireplaces);
                $("#floortype").val(listing.attributes.floortype);
                $("#garagetype").val(listing.attributes.garagetype);
                $("#lottype").val(listing.attributes.lottype);
                $("#views").val(listing.attributes.views);
                $("#ccr").val(listing.attributes.ccr);
                $("#other").val(listing.attributes.other);
                $("#mlsnum").val(listing.attributes.mlsnum);
                $("#apn").val(listing.attributes.apn);
                $("#lockbox").val(listing.attributes.lockbox);
                $("#showing").val(listing.attributes.showing);
                $("#financing").val(listing.attributes.financing);
                $("#terms").val(listing.attributes.terms);

                $("#agent").val(listing.attributes.agent);
                $("#agent").trigger("change");
                $("#escrow").val(listing.attributes.escrow);
                $("#escrow").trigger("change");
                $("#lender").val(listing.attributes.lender);
                $("#lender").trigger("change");
                $("#homeinspector").val(listing.attributes.homeinspector);
                $("#homeinspector").trigger("change");
                $("#appraiser").val(listing.attributes.appraiser);
                $("#appraiser").trigger("change");
                $("#otherescrow").val(listing.attributes.otherescrow);
                $("#otherescrow").trigger("change");
                $("#todos_list").val(listing.attributes.todos_id);
                $("#todos_list").trigger("change");
                //$("#agent").val(listing.attributes.agent).selectmenu("refresh");
                //$("#agent").selectmenu("refresh");
                //$("#escrow").val(listing.attributes.escrow).selectmenu("refresh");
                //$("#lender").val(listing.attributes.lender).selectmenu("refresh");
                //$("#homeinspector").val(listing.attributes.homeinspector).selectmenu("refresh");
                //$("#appraiser").val(listing.attributes.appraiser).selectmenu("refresh");
                //$("#otherescrow").val(listing.attributes.otherescrow).selectmenu("refresh");
                $('#listing_excrow_contacts select').selectmenu("refresh", true);
                //$("#listing_excrow_contacts select").trigger("change");
                //$("#todos_list").selectmenu("refresh", true);
                //$("#todos_list").val(listing.attributes.todos_id).selectmenu("refresh");//$("#updateprofile-view select").selectmenu("refresh", true);
                //alert(listing.attributes.agent);
                if (listing.attributes.agent != '') {

                    $("#listing_excrow_contacts a#agent_contact").attr("href", "addcontact.html#" + listing.attributes.agent);
                }
                if (listing.attributes.escrow != '') {
                    $("#listing_excrow_contacts a#escrow_contact").attr("href", "addcontact.html#" + listing.attributes.escrow);
                }
                if (listing.attributes.lender != '') {
                    $("#listing_excrow_contacts a#lender_contact").attr("href", "addcontact.html#" + listing.attributes.lender);
                }
                if (listing.attributes.homeinspector != '') {
                    $("#listing_excrow_contacts a#homeinspector_contact").attr("href", "addcontact.html#" + listing.attributes.homeinspector);
                }
                if (listing.attributes.appraiser != '') {
                    $("#listing_excrow_contacts a#appraiser_contact").attr("href", "addcontact.html#" + listing.attributes.appraiser);
                }
                if (listing.attributes.otherescrow != '') {
                    $("#listing_excrow_contacts a#other_contact").attr("href", "addcontact.html#" + listing.attributes.otherescrow);
                }

                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addListing").click(function () {
        //alert($("#listingPhotoFile").val())
        var fileUploadControl = $("#listingPhotoFile")[0];
        if (fileUploadControl.files.length > 0) {
            for (var i = 0; i < fileUploadControl.files.length; i++) {
                var file = fileUploadControl.files[0];
                var name = "photo.jpg";

                var parseFile = new Parse.File(name, file);
                parseFile.save().then(function () {
                    // The file has been saved to Parse.
                }, function (error) {
                    // The file either could not be read, or could not be saved to Parse.
                });
                /*var serverUrl = 'https://api.parse.com/1/files/' + file.name;
                 $.ajax({
                 type: "POST",
                 beforeSend: function (request) {
                 //request.setRequestHeader("X-Parse-Application-Id", '0OykuJcMdWmif83qhHytaZhgRArtOdDU4STnIvcW');
                 //request.setRequestHeader("X-Parse-REST-API-Key", 'aiAXzwjcLWqv6VxRQaVKggNceM0mH3PD4mtR5ylm');
                 request.setRequestHeader("Content-Type", file.type);
                 },
                 url: serverUrl,
                 data: file,
                 processData: false,
                 contentType: false,
                 success: function (data) {
                 alert("File available at: " + data.url);
                 },
                 error: function (data) {
                 var obj = jQuery.parseJSON(data);
                 alert(obj.error);
                 }
                 });*/
            }
        }
        /*if ($("#frm_addListing").validationEngine('validate'))
         {
         
         var user = Parse.User.current();
         var listing;
         showLoader('Saving..');
         
         if (listing_obj)
         {
         listing = listing_obj;
         listing_obj = null;
         } else
         {
         
         var Listing = Parse.Object.extend("listings");
         listing = new Listing();
         }
         listing.set("first_name", $('#first_name').val());
         listing.set("last_name", $('#last_name').val());
         listing.set("phone_number", $('#phone_number').val());
         listing.set("status", $('#status').val());
         listing.set("cell_number", $('#cell_number').val());
         listing.set("work_number", $('#work_number').val());
         listing.set("fax", $('#fax').val());
         listing.set("email", $('#email').val());
         listing.set("address", $('#address').val());
         listing.set("city", $('#city').val());
         listing.set("state", $('#state').val());
         listing.set("propertytype", $('#propertytype').val());
         listing.set("listingprice", $('#listingprice').val());
         var str = $('#listingexp').val();
         listing.set("listingexp", new Date(str));
         listing.set("numofbedrooms", $('#numofbedrooms').val());
         listing.set("numofbaths", $('#numofbaths').val());
         listing.set("squarefeet", $('#squarefeet').val());
         listing.set("yearbuilt", $('#yearbuilt').val());
         listing.set("pool", $('#pool').val());
         listing.set("hottub", $('#hottub').val());
         listing.set("garage", $('#garage').val());
         listing.set("security", $('#security').val());
         listing.set("notes", $('#notes').val());
         listing.set("heating", $('#heating').val());
         listing.set("cooling", $('#cooling').val());
         listing.set("fireplaces", $('#fireplaces').val());
         listing.set("floortype", $('#floortype').val());
         listing.set("garagetype", $('#garagetype').val());
         listing.set("lottype", $('#lottype').val());
         listing.set("views", $('#views').val());
         listing.set("ccr", $('#ccr').val());
         listing.set("other", $('#other').val());
         listing.set("mlsnum", $('#mlsnum').val());
         listing.set("apn", $('#apn').val());
         listing.set("lockbox", $('#lockbox').val());
         listing.set("showing", $('#showing').val());
         listing.set("financing", $('#financing').val());
         listing.set("terms", $('#terms').val());
         listing.set("agent", $('#agent').val());
         listing.set("escrow", $('#escrow').val());
         listing.set("lender", $('#lender').val());
         listing.set("homeinspector", $('#homeinspector').val());
         listing.set("appraiser", $('#appraiser').val());
         listing.set("otherescrow", $('#otherescrow').val());
         listing.set("todos_id", $('#todos_list').val());
         listing.set("user", user);
         listing.save(null, {
         success: function (listing)
         {
         window.location = "listings.html#saved";
         //                    $("#message").html("<div class='success'>Listing has been  saved successfully. </div>");
         //                    emptyForm('frm_addListing');
         //                    hideLoader();
         },
         error: function (user, error) {
         //alert(error.message);
         $("#message").html("<div class='error'>" + error.message + "</div>");
         hideLoader();
         
         }
         
         
         });
         
         
         }*/
    });

    $('#del_listing').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            listing_obj.destroy({
                success: function (myObject) {
                    window.location = "listings.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

//////////////////get listings/////////////
/*function getlistings()
 {
 isLogin();
 if (window.location.hash) {
 var hash = window.location.hash.substring(1);
 
 $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
 }
 
 showLoader('Loading...');
 var user = Parse.User.current();
 var Listing = Parse.Object.extend("listings");
 var query = new Parse.Query(Listing);
 //    query.equalTo("status", 'yes');
 query.equalTo("user", user);
 query.find({
 success: function (listings) {
 if (listings.length > 0)
 {
 $.each(listings, function (i, listing) {
 
 $('#listings_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addlisting.html#' + listing.id + '">' + listing.attributes.address + ' ' + listing.attributes.first_name + ' ' + listing.attributes.last_name + '</a></li>');
 
 });
 hideLoader();
 } else
 {
 $(".ui-content").prepend("<div class='info'>No record found. </div>");
 hideLoader();
 }
 // userPosts contains all of the posts by the current user.
 }
 });
 }*/


//////////////////////contacts crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add contact////////////
function addContact()
{

    isLogin();
    var contact_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Contact');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_contact" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Contact = Parse.Object.extend("contacts");
        var query = new Parse.Query(Contact);
        query.get(hash, {
            success: function (contact) {
                contact_obj = contact;
                $("#company").val(contact.attributes.company);
                $("#maincontact").val(contact.attributes.maincontact);
                $("#contacttype").val(contact.attributes.contacttype).selectmenu("refresh");
                $('#status').val(contact.attributes.status).slider('refresh');
                $("#phone_number").val(contact.attributes.phone_number);
                $("#cell_number").val(contact.attributes.cell_number);
                $("#worknumber").val(contact.attributes.worknumber);
                $("#fax").val(contact.attributes.fax);
                $("#email").val(contact.attributes.email);
                $("#address").val(contact.attributes.address);
                $("#city").val(contact.attributes.city);
                $("#state").val(contact.attributes.state);
                $("#zipcode").val(contact.attributes.zipcode);
                $("#services").val(contact.attributes.services);
                $("#website").val(contact.attributes.website);




                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addContact").click(function () {

        if ($("#frm_addContact").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var contact;
            showLoader('Saving..');

            if (contact_obj)
            {
                contact = contact_obj;
                contact_obj = null;
            } else
            {

                var Contact = Parse.Object.extend("contacts");
                contact = new Contact();
            }

            contact.set("company", $('#company').val());
            contact.set("maincontact", $('#maincontact').val());
            contact.set("contacttype", $('#contacttype').val());
            contact.set("status", $('#status').val());
            contact.set("cell_number", $('#cell_number').val());
            contact.set("work_number", $('#work_number').val());
            contact.set("fax", $('#fax').val());
            contact.set("email", $('#email').val());
            contact.set("address", $('#address').val());
            contact.set("city", $('#city').val());
            contact.set("state", $('#state').val());
            contact.set("zipcode", $('#zipcode').val());
            contact.set("services", $('#services').val());
            contact.set("website", $('#website').val());

            contact.set("user", user);
            contact.save(null, {
                success: function (contact)
                {
                    window.location = "contacts.html#saved";
//                    $("#message").html("<div class='success'>Listing has been  saved successfully. </div>");
//                    emptyForm('frm_addListing');
//                    hideLoader();
                },
                error: function (user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_contact').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            contact_obj.destroy({
                success: function (myObject) {
                    window.location = "contacts.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

//////////////////get contacts/////////////
function getcontacts()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Contact = Parse.Object.extend("contacts");
    var query = new Parse.Query(Contact);
//    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (contacts) {
            if (contacts.length > 0)
            {
                $.each(contacts, function (i, contact) {

                    $('#contacts_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addcontact.html#' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.contacttype + ' ' + contact.attributes.maincontact + '</a></li>');

                });
                hideLoader();
            } else
            {
                $(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}

function loadContacts()
{
    var user = Parse.User.current();
    var Contact = Parse.Object.extend("contacts");
    var queryEscrow = new Parse.Query(Contact);
    queryEscrow.equalTo("status", 'yes');
    queryEscrow.equalTo("user", user);
    queryEscrow.find({
        success: function (contacts) {
            if (contacts.length > 0)
            {
                $.each(contacts, function (i, contact) {
                    if (contact.attributes.contacttype == "Agent") {
                        $('#agent').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }
                    if (contact.attributes.contacttype == "Escrow") {
                        $('#escrow').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }
                    if (contact.attributes.contacttype == "Lender") {
                        $('#lender').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }
                    if (contact.attributes.contacttype == "Home Inspector") {
                        $('#homeinspector').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }
                    if (contact.attributes.contacttype == "Appraiser") {
                        $('#appraiser').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }
                    // if(contact.contacttype=="Manager"){
                    ///    $('#escrow').append('<option value="'+contact.id+'">'+contact.attributes.company + ' ' + contact.attributes.contacttype + ' ' + contact.attributes.maincontact+'</option>'); 
                    // }
                    if (contact.attributes.contacttype == "Other") {
                        $('#other').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                        $('#otherescrow').append('<option value="' + contact.id + '">' + contact.attributes.company + ' ' + contact.attributes.maincontact + '</option>');
                    }

                });
            } else
            {
                //$('#escrow').append('<option value="">No Contact</option>');
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
    var user = Parse.User.current();
    var Todo = Parse.Object.extend("todos");
    var query = new Parse.Query(Todo);
    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (todos) {
            if (todos.length > 0)
            {
                $.each(todos, function (i, todo) {
                    var now = new Date(todo.attributes.duedate);

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);

                    var today = (month) + "/" + (day) + "/" + now.getFullYear();
                    $('#todos_list').append('<option value="' + todo.id + '">' + todo.attributes.task + '  -  ' + today + '</option>');

                });
                hideLoader();
            } else
            {
                $('#todos_list').html("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}

function changeAnchorValue(type, selected) {
    if (type == 'agent') {
        $("a#agent_contact").attr("href", "addcontact.html#" + selected.value);
    }
    if (type == 'escrow') {
        $("a#escrow_contact").attr("href", "addcontact.html#" + selected.value);
    }
    if (type == 'lender') {
        $("a#lender_contact").attr("href", "addcontact.html#" + selected.value);
    }
    if (type == 'homeinspector') {
        $("a#homeinspector_contact").attr("href", "addcontact.html#" + selected.value);
    }
    if (type == 'appraiser') {
        $("a#appraiser_contact").attr("href", "addcontact.html#" + selected.value);
    }
    if (type == 'other') {
        $("a#other_contact").attr("href", "addcontact.html#" + selected.value);
    }
}

//////////////////////todos crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add todo////////////
function addTodo()
{

    isLogin();
    var todo_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update To Do');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_todo" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Todo = Parse.Object.extend("todos");
        var query = new Parse.Query(Todo);
        query.get(hash, {
            success: function (todo) {
                todo_obj = todo;
                $('#status').val(todo.attributes.status).slider('refresh');
                var now = new Date(todo.attributes.duedate);

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = (month) + "/" + (day) + "/" + now.getFullYear();
                $("#duedate").val(today);
                $("#task").val(todo.attributes.task);

                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addTodo").click(function () {

        if ($("#frm_addTodo").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var todo;
            showLoader('Saving..');
            if (todo_obj)
            {
                todo = todo_obj;
                todo_obj = null;
            } else
            {

                var Todo = Parse.Object.extend("todos");
                todo = new Todo();
            }
            todo.set("status", $('#status').val());
            var str = $('#duedate').val();
            todo.set("duedate", new Date(str));
            todo.set("task", $('#task').val());
            todo.set("user", user);
            todo.save(null, {
                success: function (todo)
                {
                    window.location = "todos.html#saved";
                    hideLoader();
                },
                error: function (user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });
        }
    });

    $('#del_todo').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            todo_obj.destroy({
                success: function (myObject) {
                    window.location = "todos.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

//////////////////get todos/////////////
function gettodos()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Todo = Parse.Object.extend("todos");
    var query = new Parse.Query(Todo);
//    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (todos) {
            if (todos.length > 0)
            {
                $.each(todos, function (i, todo) {
                    var now = new Date(todo.attributes.duedate);

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);

                    var today = (month) + "/" + (day) + "/" + now.getFullYear();
                    $('#todos_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addtodos.html#' + todo.id + '">' + todo.attributes.task + '  -  ' + today + '</a></li>');

                });
                hideLoader();
            } else
            {
                $(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}


//////////////////////leads crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add lead////////////
function addBuyer()
{

    isLogin();
    var buyer_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Buyer');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_buyer" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Buyer = Parse.Object.extend("buyers");
        var query = new Parse.Query(Buyer);
        query.get(hash, {
            success: function (buyer) {

                buyer_obj = buyer;

                $("#first_name").val(buyer.attributes.first_name);
                $("#last_name").val(buyer.attributes.last_name);
                $('#status').val(buyer.attributes.status).slider('refresh');
                $('#lead').val(buyer.attributes.lead).slider('refresh');
                $("#phone_number").val(buyer.attributes.phone_number);
                if (buyer.attributes.phone_number != "")
                {
                    $('#homenumberanchor').prop("href", "tel:" + buyer.attributes.phone_number);
                }


                if (buyer.attributes.email != "")
                {
                    $('#emailanchor').prop("href", "mailto:" + buyer.attributes.email);
                }
                $("#cell_number").val(buyer.attributes.cell_number);
                if (buyer.attributes.cell_number != "")
                {
                    $('#cell_numberanchor').prop("href", "tel:" + buyer.attributes.cell_number);
                }


                $("#worknumber").val(buyer.attributes.worknumber);
                if (buyer.attributes.worknumber != "")
                {
                    $('#worknumberanchor').prop("href", "tel:" + buyer.attributes.worknumber);
                }



                $("#fax").val(buyer.attributes.fax);
                $("#email").val(buyer.attributes.email);
                $("#address").val(buyer.attributes.address);
                $("#city").val(buyer.attributes.city);
                $("#state").val(buyer.attributes.state);
                $("#zipcode").val(buyer.attributes.zipcode);
                $("#location").val(buyer.attributes.location);
                $("#propertytype").val(buyer.attributes.propertytype).selectmenu("refresh");
                $("#pricerange").val(buyer.attributes.pricerange);
                $("#numofbedrooms").val(buyer.attributes.numofbedrooms);
                $("#numofbaths").val(buyer.attributes.numofbaths);
                if (buyer.attributes.pool == 'on')
                {
                    $('#pool').prop('checked', true).checkboxradio('refresh');
                }
                //$("#pool").val(buyer.attributes.pool);
                $("#notes").val(buyer.attributes.notes);
                $("#property1").val(buyer.attributes.property1);
                $("#property2").val(buyer.attributes.property2);
                $("#property3").val(buyer.attributes.property3);
                $("#property4").val(buyer.attributes.property4);
                $("#property5").val(buyer.attributes.property5);
                $("#facebookid").val(buyer.attributes.facebookid);
                $("#twitterid").val(buyer.attributes.twitterid);
                $("#linkedinid").val(buyer.attributes.linkedinid);
                $("#googleid").val(buyer.attributes.googleid);
                $("#tumblrid").val(buyer.attributes.tumblrid);
                $("#pintrestid").val(buyer.attributes.pintrestid);
                //$("#agent").val(buyer.attributes.agent).selectmenu("refresh");
                //$("#escrow").val(buyer.attributes.escrow).selectmenu("refresh");
                //$("#lender").val(buyer.attributes.lender).selectmenu("refresh");
                //$("#homeinspector").val(buyer.attributes.homeinspector).selectmenu("refresh");
                //$("#appraiser").val(buyer.attributes.appraiser).selectmenu("refresh");
                //$("#other").val(buyer.attributes.other).selectmenu("refresh");
                $("#agent").val(buyer.attributes.agent);
                $("#agent").trigger("change");
                $("#escrow").val(buyer.attributes.escrow);
                $("#escrow").trigger("change");
                $("#lender").val(buyer.attributes.lender);
                $("#lender").trigger("change");
                $("#homeinspector").val(buyer.attributes.homeinspector);
                $("#homeinspector").trigger("change");
                $("#appraiser").val(buyer.attributes.appraiser);
                $("#appraiser").trigger("change");
                $("#other").val(buyer.attributes.otherescrow);
                $("#other").trigger("change");
                $("#todos_list").val(buyer.attributes.todos_id);
                $("#todos_list").trigger("change");
                //$("#agent").val(listing.attributes.agent).selectmenu("refresh");
                //$("#agent").selectmenu("refresh");
                //$("#escrow").val(listing.attributes.escrow).selectmenu("refresh");
                //$("#lender").val(listing.attributes.lender).selectmenu("refresh");
                //$("#homeinspector").val(listing.attributes.homeinspector).selectmenu("refresh");
                //$("#appraiser").val(listing.attributes.appraiser).selectmenu("refresh");
                //$("#otherescrow").val(listing.attributes.otherescrow).selectmenu("refresh");
                $('#buyers_excrow_contacts select').selectmenu("refresh", true);
                //$("#listing_excrow_contacts select").trigger("change");
                //$("#todos_list").selectmenu("refresh", true);
                //$("#todos_list").val(listing.attributes.todos_id).selectmenu("refresh");//$("#updateprofile-view select").selectmenu("refresh", true);
                //alert(listing.attributes.agent);

                if (buyer.attributes.agent != '') {
                    $("a#agent_contact").attr("href", "addcontact.html#" + buyer.attributes.agent);
                }
                if (buyer.attributes.escrow != '') {
                    $("a#escrow_contact").attr("href", "addcontact.html#" + buyer.attributes.escrow);
                }
                if (buyer.attributes.lender != '') {
                    $("a#lender_contact").attr("href", "addcontact.html#" + buyer.attributes.lender);
                }
                if (buyer.attributes.homeinspector != '') {
                    $("a#homeinspector_contact").attr("href", "addcontact.html#" + buyer.attributes.homeinspector);
                }
                if (buyer.attributes.appraiser != '') {
                    $("a#appraiser_contact").attr("href", "addcontact.html#" + buyer.attributes.appraiser);
                }
                if (buyer.attributes.other != '') {
                    $("a#other_contact").attr("href", "addcontact.html#" + buyer.attributes.other);
                }

                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addBuyer").click(function () {

        if ($("#frm_addBuyer").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var buyer;
            showLoader('Saving..');

            if (buyer_obj)
            {
                buyer = buyer_obj;
                buyer_obj = null;
            } else
            {

                var Buyer = Parse.Object.extend("buyers");
                buyer = new Buyer();
            }

            buyer.set("first_name", $('#first_name').val());
            buyer.set("last_name", $('#last_name').val());
            buyer.set("phone_number", $('#phone_number').val());
            buyer.set("status", $('#status').val());
            buyer.set("lead", $('#lead').val());
            buyer.set("cell_number", $('#cell_number').val());
            buyer.set("worknumber", $('#worknumber').val());
            buyer.set("fax", $('#fax').val());
            buyer.set("email", $('#email').val());
            buyer.set("address", $('#address').val());
            buyer.set("city", $('#city').val());
            buyer.set("state", $('#state').val());
            buyer.set("zipcode", $('#zipcode').val());
            buyer.set("location", $('#location').val());
            buyer.set("propertytype", $('#propertytype').val());
            buyer.set("pricerange", $('#pricerange').val());
            buyer.set("numofbedrooms", $('#numofbedrooms').val());
            buyer.set("numofbaths", $('#numofbaths').val());
            if ($('#pool').prop("checked"))
            {
                buyer.set("pool", 'on');
            } else
            {
                buyer.set("pool", 'off');
            }
            buyer.set("notes", $('#notes').val());
            buyer.set("property1", $('#property1').val());
            buyer.set("property2", $('#property2').val());
            buyer.set("property3", $('#property3').val());
            buyer.set("property4", $('#property4').val());
            buyer.set("property5", $('#property5').val());
            buyer.set("facebookid", $('#facebookid').val());
            buyer.set("twitterid", $('#twitterid').val());
            buyer.set("linkedinid", $('#linkedinid').val());
            buyer.set("googleid", $('#googleid').val());
            buyer.set("tumblrid", $('#tumblrid').val());
            buyer.set("pintrestid", $('#pintrestid').val());
            buyer.set("agent", $('#agent').val());
            buyer.set("escrow", $('#escrow').val());
            buyer.set("lender", $('#lender').val());
            buyer.set("homeinspector", $('#homeinspector').val());
            buyer.set("appraiser", $('#appraiser').val());
            buyer.set("other", $('#other').val());
            buyer.set("todos_id", $('#todos_list').val());


            buyer.set("user", user);
            buyer.save(null, {
                success: function (buyer)
                {
                    window.location = "buyers.html#saved";
//                    $("#message").html("<div class='success'>Buyer has been  saved successfully. </div>");
//                    emptyForm('frm_addBuyer');
//                    hideLoader();
                },
                error: function (user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_buyer').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            buyer_obj.destroy({
                success: function (myObject) {
                    window.location = "buyers.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}



//////////////////get leads/////////////
/*function getbuyers()
 {
 
 isLogin();
 if (window.location.hash) {
 var hash = window.location.hash.substring(1);
 
 $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
 }
 
 showLoader('Loading...');
 var user = Parse.User.current();
 var Buyer = Parse.Object.extend("buyers");
 var query = new Parse.Query(Buyer);
 //    query.equalTo("status", 'yes');
 query.equalTo("user", user);
 query.find({
 success: function (buyers) {
 if (buyers.length > 0)
 {
 $.each(buyers, function (i, buyer) {
 
 $('#buyers_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addbuyer.html#' + buyer.id + '">' + buyer.attributes.first_name + ' ' + buyer.attributes.last_name + '</a></li>');
 
 });
 hideLoader();
 } else
 {
 $(".ui-content").prepend("<div class='info'>No record found. </div>");
 hideLoader();
 }
 // userPosts contains all of the posts by the current user.
 }
 });
 }*/