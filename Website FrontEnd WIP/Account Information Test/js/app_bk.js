
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

