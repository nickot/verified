
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
    $("#doSignup").click(function() {
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
                success: function(user) {
                    hideLoader();
                    emptyForm('frm_signup');
                    $("#message").html("<div class='success'>We have sent an email to active your account</div>");

                },
                error: function(user, error) {
                    hideLoader();
                    $("#message").html("<div class='error'>" + error.message + "</div>");

                }
            });
        }
    });
}
function doLogin()
{
    $("#doLogin").click(function() {

        if ($("#frm_login").validationEngine('validate'))
        {

            showLoader('Login..');
            Parse.User.logIn($('#email').val(), $('#password').val(), {
                success: function(user) {

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        window.location = "index.html";
                        // $("#message").html("<div class='success'>Logged In</div>");
                    }


                    hideLoader();
                    // Do stuff after successful login.
                },
                error: function(user, error) {
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
    $("#doforgetPassword").click(function() {

        if ($("#frm_forgetpassword").validationEngine('validate'))
        {

            showLoader('requesting..');


            Parse.User.requestPasswordReset($('#email').val(), {
                success: function() {
                    hideLoader();
                    emptyForm('frm_signup');
                    $("#message").append("<div class='success'>We have sent an email to recover your password</div>");
                },
                error: function(error) {
                    hideLoader();
                    $("#message").append("<div class='error'>" + error.message + "</div>");
                }
            });

        }
    });
}

//////////////////////buyers crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add buyer////////////
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
            success: function(buyer) {
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
                $("#propertytype").val(buyer.attributes.propertytype);
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
            error: function(object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addBuyer").click(function() {

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
                success: function(buyer)
                {
                    window.location = "buyers.html#saved";
//                    $("#message").html("<div class='success'>Buyer has been  saved successfully. </div>");
//                    emptyForm('frm_addBuyer');
//                    hideLoader();
                },
                error: function(user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_buyer').click(function() {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            buyer_obj.destroy({
                success: function(myObject) {
                    window.location = "buyers.html#deleted";
                },
                error: function(myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

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
        success: function(buyers) {
            if (buyers.length > 0)
            {
                $.each(buyers, function(i, buyer) {

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

//////////////////////buyers crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add buyer////////////
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
            success: function(buyer) {
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
                $("#propertytype").val(buyer.attributes.propertytype);
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
            error: function(object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addBuyer").click(function() {

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
                success: function(buyer)
                {
                    window.location = "buyers.html#saved";
//                    $("#message").html("<div class='success'>Buyer has been  saved successfully. </div>");
//                    emptyForm('frm_addBuyer');
//                    hideLoader();
                },
                error: function(user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_buyer').click(function() {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            buyer_obj.destroy({
                success: function(myObject) {
                    window.location = "buyers.html#deleted";
                },
                error: function(myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

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
        success: function(buyers) {
            if (buyers.length > 0)
            {
                $.each(buyers, function(i, buyer) {

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
            success: function(listing) {
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
                $("#propertytype").val(listing.attributes.propertytype);
                $("#listingprice").val(listing.attributes.listingprice);
                $("#listingexp").val(listing.attributes.listingexp);
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
                $("#lender").val(listing.attributes.lender);
                $("#homeinspector").val(listing.attributes.homeinspector);
                $("#appraiser").val(listing.attributes.appraiser);
                $("#otherescrow").val(listing.attributes.otherescrow);





                hideLoader();

            },
            error: function(object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addListing").click(function() {

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
            listing.set("listingexp", $('#listingexp').val());
            listing.set("numofdebrooms", $('#numofdebrooms').val());
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




            listing.set("user", user);
            listing.save(null, {
                success: function(listing)
                {
                    window.location = "listings.html#saved";
//                    $("#message").html("<div class='success'>Listing has been  saved successfully. </div>");
//                    emptyForm('frm_addListing');
//                    hideLoader();
                },
                error: function(user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_listing').click(function() {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            listing_obj.destroy({
                success: function(myObject) {
                    window.location = "listings.html#deleted";
                },
                error: function(myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

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
        success: function(listings) {
            if (listings.length > 0)
            {
                $.each(listings, function(i, listing) {

                    $('#listings_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addlisting.html#' + listing.id + '">' +  listing.attributes.address + ' ' + listing.attributes.first_name + ' ' + listing.attributes.last_name + '</a></li>');

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