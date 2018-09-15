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
                    localStorage.setItem("user_email", $('#email').val());
                    var currentUser = Parse.User.current();
                    var now = new Date();

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);
                    //alert(new Date(user.attributes.expire_date));
                    var today = now.getFullYear() + "-" + (month) + "-" + (day);
                    if (currentUser && today <= user.attributes.expire_date) {
                        window.location = "index.html";
                        // $("#message").html("<div class='success'>Logged In</div>");
                    }else{
                        $("#message").html("<div class='error'> Your subscription has expired. Please resubscribe</div>");
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

function doLogin2()
{
    $("#doLogin").click(function () {

        if ($("#frm_login").validationEngine('validate'))
        {

            //alert(localStorage.getItem("user_email"));
            Parse.User.logIn(localStorage.getItem("user_email"), $('#password').val(), {
                success: function (user) {

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        window.location = "lead_list.html";
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

//////////////////get buyers/////////////
function getbuyers()
{

    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }
    localStorage.setItem("buyerID", "");
    showLoader('Loading...');
    var user = Parse.User.current();
    var Buyer = Parse.Object.extend("buyers");
    var query = new Parse.Query(Buyer);
    query.equalTo("status", 'yes');
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
function getallbuyers()
{

    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }
    localStorage.setItem("buyerID", "");
    showLoader('Loading...');
    var user = Parse.User.current();
    var Buyer = Parse.Object.extend("buyers");
    var query = new Parse.Query(Buyer);
    //query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (buyers) {
            $('#buyers_listing').html('');
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
//////////////////get listings/////////////
function getlistings()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }
    localStorage.setItem("picID", randomString(12, 16));
    localStorage.setItem("listID", "")
    showLoader('Loading...');
    var user = Parse.User.current();
    var Listing = Parse.Object.extend("listings");
    var query = new Parse.Query(Listing);
    query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (listings) {
            if (listings.length > 0)
            {
                $.each(listings, function (i, listing) {

                    $('#listings_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addlisting.html#' + listing.id + '">' + listing.attributes.listing_type + ' ' + listing.attributes.address + ' ' + listing.attributes.first_name + ' ' + listing.attributes.last_name + '</a></li>');

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

function getalllistings()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }
    localStorage.setItem("picID", randomString(12, 16));
    localStorage.setItem("listID", "")
    showLoader('Loading...');
    var user = Parse.User.current();
    var Listing = Parse.Object.extend("listings");
    var query = new Parse.Query(Listing);
    //query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (listings) {
            $('#listings_listing').html('');
            if (listings.length > 0)
            {
                $.each(listings, function (i, listing) {

                    $('#listings_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addlisting.html#' + listing.id + '">' + listing.attributes.listing_type + ' ' + listing.attributes.address + ' ' + listing.attributes.first_name + ' ' + listing.attributes.last_name + '</a></li>');

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

var randomString = function (len, bits)
{
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toLowerCase();
};
//var pictureUniqueID = randomString(12, 16);

////////////////////add listing////////////
function addListing()
{

    isLogin();
    var listing_obj = null;
    var todo_listing_obj = null;
    //alert(localStorage.getItem("listID"));
    if (window.location.hash || localStorage.getItem("listID")) {
        $('#page_title').html('Update Listing');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_listing" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = localStorage.getItem("listID") ? localStorage.getItem("listID") : window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        localStorage.setItem("listID", hash);

        var Listing = Parse.Object.extend("listings");
        var query = new Parse.Query(Listing);
        query.get(localStorage.getItem("listID"), {
            success: function (listing) {
                listing_obj = listing;
                $("#first_name").val(listing.attributes.first_name);
                $("#last_name").val(listing.attributes.last_name);
                $('#status').val(listing.attributes.status).slider('refresh');
                $('#listing_type').val(listing.attributes.listing_type).slider('refresh');
                $("#phone_number").val(listing.attributes.phone_number);
                $("#cell_number").val(listing.attributes.cell_number);
                $("#work_number").val(listing.attributes.work_number);
                $("#work_number").val(listing.attributes.work_number);
                $("#fax").val(listing.attributes.fax);
                $("#email").val(listing.attributes.email);
                if (listing.attributes.phone_number != "")
                {
                    $('#homenumberanchor').prop("href", "tel:" + listing.attributes.phone_number);
                }


                if (listing.attributes.email != "")
                {
                    $('#listing_email').prop("href", "mailto:" + listing.attributes.email);
                }
                if (listing.attributes.cell_number != "")
                {
                    $('#cellnumberanchor').prop("href", "tel:" + listing.attributes.cell_number);
                }
                if (listing.attributes.work_number != "")
                {
                    $('#worknumberanchor').prop("href", "tel:" + listing.attributes.work_number);
                }
                //$("a#listing_email").attr("href", "mailto:" + listing.attributes.email);
                $("#address").val(listing.attributes.address);
                $("#city").val(listing.attributes.city);
                $("#state").val(listing.attributes.state);
                $("#propertytype").val(listing.attributes.propertytype).selectmenu("refresh");
                $("#listingprice").val(listing.attributes.listingprice);
//                var d = listing.attributes.listingexp;
//                var curr_date = d.getDate();
//                var curr_month = d.getMonth() + 1;
//                var curr_year = d.getFullYear();
                if (listing.attributes.listingexp) {


                    var now = new Date(listing.attributes.listingexp);

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);

                    var today = now.getFullYear() + "-" + (month) + "-" + (day);

                    $('#listingexp').val(today);
                }
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
                $('#listing_excrow_contacts select').selectmenu("refresh", true);
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
                /*var Todo = Parse.Object.extend("todos");
                 var query = new Parse.Query(Todo);
                 query.get(listing.attributes.todos_id, {
                 success: function (todo) {
                 todo_listing_obj = todo;
                 $('#todo_status').val(todo.attributes.status).slider('refresh');
                 var now = new Date(todo.attributes.duedate);
                 
                 var day = ("0" + now.getDate()).slice(-2);
                 var month = ("0" + (now.getMonth() + 1)).slice(-2);
                 
                 
                 var today = now.getFullYear() + "-" + (month) + "-" + (day);
                 
                 $("#todo_duedate").val(today);
                 $("#todo_task").val(todo.attributes.task);
                 $("#todo_type").val(todo.attributes.type).selectmenu('refresh');
                 todo.set("type", $('#todo_type').val());
                 $("a#addimages_id").attr("href", "addimages.html#" + localStorage.getItem("picID"));
                 hideLoader();
                 
                 },
                 error: function (object, error) {
                 $("#message").html("<div class='error'>" + error.message + "</div>");
                 hideLoader();
                 }
                 });*/
                //alert(listing.attributes.pictureUniqueID);
                //pictureUniqueID = listing.attributes.pictureUniqueID;
                localStorage.setItem("picID", listing.attributes.pictureUniqueID);
                $("a#addimages_id").attr("href", "addimages.html#" + localStorage.getItem("picID"));
                hideLoader();
            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    } else {

        $("a#addimages_id").attr("href", "addimages.html#" + localStorage.getItem("picID"));
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
            listing.set("listing_type", $('#listing_type').val());
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
            if (str) {
                listing.set("listingexp", new Date(str));
            }
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
            listing.set("pictureUniqueID", localStorage.getItem("picID"));

            listing.set("user", user);
            if ($('#todo_task').val()) {
                var user = Parse.User.current();
                var todo;
                /*if (todo_listing_obj)
                 {
                 todo = todo_listing_obj;
                 todo_listing_obj = null;
                 
                 } else
                 {
                 var Todo = Parse.Object.extend("todos");
                 todo = new Todo();
                 }*/
                var Todo = Parse.Object.extend("todos");
                todo = new Todo();
                todo.set("status", $('#todo_status').val());
                var str = $('#todo_duedate').val();
                if (str) {
                    todo.set("duedate", new Date(str));
                }
                todo.set("task", $('#todo_task').val());
                todo.set("type", $('#todo_type').val());

                todo.set("user", user);
                listing.save(null, {
                    success: function (listing)
                    {
                        var listID = localStorage.getItem("listID") ? localStorage.getItem("listID") : listing.id;
                        todo.set("listing_id", listID);
                        todo.set("listing_buyer_name", $('#first_name').val() + " " + $('#last_name').val());
                        todo.save(null, {
                            success: function (todo)
                            {
                                window.location = "listings.html#saved";
                                /*listing.set("todos_id", todo.id);
                                 listing.save(null, {
                                 success: function (listing)
                                 {
                                 window.location = "listings.html#saved";
                                 },
                                 error: function (user, error) {
                                 $("#message").html("<div class='error'>" + error.message + "</div>");
                                 hideLoader();
                                 
                                 }
                                 
                                 
                                 });*/
                                hideLoader();
                            },
                            error: function (user, error) {
                                //$("#message").html("<div class='error'>" + error.message + "</div>");
                                hideLoader();

                            }


                        });


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

            } else {

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
            }

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
}
//////////////////////contacts crud/////////////////////////////////////////////////////////////////////////////////////////////////

function uploadImage() {
    var hash = localStorage.getItem("picID");
    var fileUploadControl = $("#listingPhotoFile")[0];
    if (fileUploadControl.files.length > 0) {
        var user = Parse.User.current();
        for (var i = 0; i < fileUploadControl.files.length; i++) {
            var file = fileUploadControl.files[0];
            var name;
            var fileSize = file.size / 1024 / 1024;
            if (file.type.indexOf("video/") == 0) {
                if (fileSize > 5) {
                    alert("Video file size should be less than 5MB");
                } else {
                    name = randomString(12, 16) + "_video.mp4";
                    var parseFile = new Parse.File(name, file);
                    var ListingImages = Parse.Object.extend("listingImages");
                    var listingImage = new ListingImages();
                    parseFile.save().then(function () {
                        listingImage.set("pictureUniqueID", hash);
                        listingImage.set("imageUrl", parseFile.url());
                        listingImage.set("imageDesc", $('#pics_desc').val());
                        listingImage.set("default_image", "No");
                        listingImage.set("source_type", "video");
                        listingImage.set("user", user);
                        listingImage.save();
                        location.reload();
                        console.log("parseFile.name()->" + hash);
                        console.log("parseFile.url()->" + parseFile.url());
                    }, function (error) {
                        // The file either could not be read, or could not be saved to Parse.
                    });
                }
            } else {
                name = randomString(12, 16) + "_photo.jpg";
                var parseFile = new Parse.File(name, file);
                var ListingImages = Parse.Object.extend("listingImages");
                var listingImage = new ListingImages();
                parseFile.save().then(function () {
                    listingImage.set("pictureUniqueID", hash);
                    listingImage.set("imageUrl", parseFile.url());
                    listingImage.set("imageDesc", $('#pics_desc').val());
                    listingImage.set("default_image", "No");
                    listingImage.set("source_type", "image");
                    listingImage.set("user", user);
                    listingImage.save();
                    location.reload();
                    console.log("parseFile.name()->" + hash);
                    console.log("parseFile.url()->" + parseFile.url());
                }, function (error) {
                    // The file either could not be read, or could not be saved to Parse.
                });
            }
        }

    }
}

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
    query.equalTo("status", 'yes');
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

function getallcontacts()
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
    //query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (contacts) {
            $('#contacts_listing').html('');
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

function loadListingImages()
{
    isLogin();
    showLoader('Loading Images..');
    var user = Parse.User.current();
    var ListingImages = Parse.Object.extend("listingImages");
    var queryImages = new Parse.Query(ListingImages);
    queryImages.equalTo("pictureUniqueID", localStorage.getItem("picID"));
    queryImages.equalTo("user", user);
    queryImages.find({
        success: function (images) {
            if (images.length > 0)
            {
                $('#imagesContainerWrapper').show();
                $.each(images, function (i, image) {
                    var html = "";
                    if (image.attributes.source_type == 'video') {
                        var videohtml = '<video width="200" height="200" controls><source src="' + image.attributes.imageUrl + '" /></video>';
                        html = '<div class="swiper-slide"><a class="close-btn" id="' + image.id + '" onclick=' + "javascript:deleteImage(this.id)" + '><img src="images/cross_icon.png" /></a>' + videohtml + '<div class="bx-caption"><span>' + image.attributes.imageDesc + '</span></div></div>';
                    } else {
                        if (image.attributes.default_image == 'Yes') {
                            //$('#' + image.id).attr("checked", "true");

                            html = '<div class="swiper-slide"><a class="close-btn" id="' + image.id + '" onclick=' + "javascript:deleteImage(this.id)" + '><img src="images/cross_icon.png" /></a><img src="' + image.attributes.imageUrl + '"><div class="bx-caption"><span>' + image.attributes.imageDesc + '</span></div><div id="radio_class">Default:<input id="' + image.id + '" type="checkbox" name="group1"  checked="checked" value="' + image.id + '" onclick="setDefault(this.value)"></div></div>';
                        } else {
                            html = '<div class="swiper-slide"><a class="close-btn" id="' + image.id + '" onclick=' + "javascript:deleteImage(this.id)" + '><img src="images/cross_icon.png" /></a><img src="' + image.attributes.imageUrl + '"><div class="bx-caption"><span>' + image.attributes.imageDesc + '</span></div><div id="radio_class">Default:<input id="' + image.id + '" type="checkbox" name="group1"  value="' + image.id + '" onclick="setDefault(this.value)"></div></div>';
                        }

                    }
                    //$('#imagesContainer').append("<form><fieldset data-role='controlgroup'>"+html+"</fieldset></form>");
                    $('#imagesContainer').append(html);
                    //$('#imagesContainer').append('<div class="swiper-slide"><a class="close-btn" id="' + image.id + '" onclick=' + "javascript:deleteImage(this.id)" + '><img src="images/delete.png" /></a><img src="' + image.attributes.imageUrl + '"><div class="bx-caption"><span>' + image.attributes.imageDesc + '</span></div></div>');
                });
                var mySwiper = new Swiper('.swiper-container', {
                    pagination: '.pagination',
                    loop: true,
                    grabCursor: true,
                    //calculateHeight:true,
                    paginationClickable: true
                })
                $('.arrow-left').on('click', function (e) {
                    e.preventDefault()
                    mySwiper.swipePrev()
                })
                $('.arrow-right').on('click', function (e) {
                    e.preventDefault()
                    mySwiper.swipeNext()
                })
                hideLoader();
            } else
            {
                $('#imagesContainerWrapper').hide();
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}
function deleteImage(image_id) {
    if (confirm("Are you sure to delete this image?")) {
        showLoader('Deleting..');
        var user = Parse.User.current();
        var ListingImages = Parse.Object.extend("listingImages");
        var queryImages = new Parse.Query(ListingImages);
        queryImages.equalTo("user", user);
        queryImages.get(image_id, {
            success: function (image_obj) {
                image_obj.destroy({
                    success: function (myObject) {
                        location.reload();
                    },
                    error: function (myObject, error) {
                        $("#message").html("<div class='error'>" + error.message + "</div>");
                        hideLoader();
                    }
                });
                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });

    }
}
function setDefault(image_id) {
    isLogin();
    //showLoader('Loading Images..');
    var user = Parse.User.current();
    var ListingImages = Parse.Object.extend("listingImages");
    var queryImages = new Parse.Query(ListingImages);
    queryImages.equalTo("pictureUniqueID", localStorage.getItem("picID"));
    queryImages.equalTo("user", user);
    queryImages.find({
        success: function (images) {
            if (images.length > 0)
            {
                $.each(images, function (i, image) {
                    if (image_id === image.id && image.attributes.default_image == 'No') {
                        console.log(image_id + "--" + image.attributes.default_image);
                        /*if(image.attributes.default_image == 'No'){
                         image.set("default_image", 'Yes');
                         }
                         if(image.attributes.default_image == 'Yes'){
                         image.set("default_image", 'No');
                         }*/
                        image.set("default_image", 'Yes');
                        image.set("user", user);
                        image.save(null, {
                            success: function (contact)
                            {
                                location.reload();

                            },
                            error: function (user, error) {
                                //alert('error');
                            }

                        });
                    } else {
                        console.log(image_id + "-" + image.attributes.default_image);
                        image.set("default_image", 'No');

                        image.set("user", user);
                        image.save(null, {
                            success: function (contact)
                            {
                                location.reload();

                            },
                            error: function (user, error) {
                                //alert('error');
                            }

                        });
                    }
                });
                hideLoader();
            } else
            {
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
    /*var user = Parse.User.current();
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
     });*/
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

function updateTodo() {
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


                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $("#duedate").val(today);
                $("#task").val(todo.attributes.task);
                $("#todo_type").val(todo.attributes.type).selectmenu('refresh');
                $("a#todolisting").attr("href", "addlisting.html#" + localStorage.getItem("listID"));
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
            if (str) {
                todo.set("duedate", new Date(str));
            }
            todo.set("task", $('#task').val());
            todo.set("type", $('#todo_type').val());
            todo.set("user", user);
            todo.save(null, {
                success: function (todo)
                {
                    window.location = "addlisting.html#" + localStorage.getItem("listID");
                    hideLoader();
                },
                error: function (user, error) {
                    //$("#message").html("<div class='error'>" + error.message + "</div>");
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
                    window.location = "addlisting.html#" + localStorage.getItem("listID");
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

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


                var today = now.getFullYear() + "-" + (month) + "-" + (day);

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
            if (str) {
                todo.set("duedate", new Date(str));
            }
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
                    $('#todos_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addtodos.html#' + todo.id + '">' + today + '  -  ' + todo.attributes.type + '  -  ' + todo.attributes.listing_buyer_name + '</a></li>');

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

function getListingTodos()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        //alert(hash)
        //$(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Todo = Parse.Object.extend("todos");
    var query = new Parse.Query(Todo);
    query.equalTo("user", user);
    query.equalTo("status", 'yes');
    query.equalTo("listing_id", hash);

    query.find({
        success: function (todos) {
            if (todos.length > 0)
            {
                $.each(todos, function (i, todo) {
                    var now = new Date(todo.attributes.duedate);

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);

                    var today = (month) + "/" + (day) + "/" + now.getFullYear();
                    $('#todos_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="updatetodos.html#' + todo.id + '">' + today + '  -  ' + todo.attributes.type + '  -  ' + todo.attributes.listing_buyer_name + '</a></li>');

                });
                hideLoader();
            } else
            {
                //$(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}
function getBuyerTodos() {
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        //alert(hash)
        //$(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Todo = Parse.Object.extend("todos");
    var query = new Parse.Query(Todo);
    query.equalTo("user", user);
    query.equalTo("status", 'yes');
    query.equalTo("listing_id", hash);

    query.find({
        success: function (todos) {
            if (todos.length > 0)
            {
                $.each(todos, function (i, todo) {
                    var now = new Date(todo.attributes.duedate);

                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);

                    var today = (month) + "/" + (day) + "/" + now.getFullYear();
                    $('#todos_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="updatebuyertodos.html#' + todo.id + '">' + today + '  -  ' + todo.attributes.type + '  -  ' + todo.attributes.listing_buyer_name + '</a></li>');

                });
                hideLoader();
            } else
            {
                //$(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
}
function updateBuyerTodo() {
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


                var today = now.getFullYear() + "-" + (month) + "-" + (day);

                $("#duedate").val(today);
                $("#task").val(todo.attributes.task);
                $("#todo_type").val(todo.attributes.type).selectmenu('refresh');
                $("a#todolisting").attr("href", "addbuyer.html#" + localStorage.getItem("buyerID"));
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
            if (str) {
                todo.set("duedate", new Date(str));
            }
            todo.set("task", $('#task').val());
            todo.set("type", $('#todo_type').val());
            todo.set("user", user);
            todo.save(null, {
                success: function (todo)
                {
                    window.location = "addbuyer.html#" + localStorage.getItem("buyerID");
                    hideLoader();
                },
                error: function (user, error) {
                    //$("#message").html("<div class='error'>" + error.message + "</div>");
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
                    window.location = "addbuyer.html#" + localStorage.getItem("buyerID");
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}
//////////////////////leads crud/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////add lead////////////
function addBuyer()
{

    isLogin();
    var buyer_obj = null;
    var todo_buyer_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Buyer');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_buyer" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = localStorage.getItem("buyerID") ? localStorage.getItem("buyerID") : window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        localStorage.setItem("buyerID", hash);
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
                // $("#todos_list").val(buyer.attributes.todos_id);
                //$("#todos_list").trigger("change");
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
                /*var Todo = Parse.Object.extend("todos");
                 var query = new Parse.Query(Todo);
                 //alert(listing.attributes.todos_id);
                 query.get(buyer.attributes.todos_id, {
                 success: function (todo) {
                 todo_buyer_obj = todo;
                 $('#todo_status').val(todo.attributes.status).slider('refresh');
                 var now = new Date(todo.attributes.duedate);
                 
                 var day = ("0" + now.getDate()).slice(-2);
                 var month = ("0" + (now.getMonth() + 1)).slice(-2);
                 
                 
                 var today = now.getFullYear() + "-" + (month) + "-" + (day);
                 
                 $("#todo_duedate").val(today);
                 $("#todo_task").val(todo.attributes.task);
                 $("#todo_type").val(todo.attributes.type).selectmenu('refresh');
                 hideLoader();
                 
                 },
                 error: function (object, error) {
                 $("#message").html("<div class='error'>" + error.message + "</div>");
                 hideLoader();
                 }
                 });*/
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
            // buyer.set("todos_id", $('#todos_list').val());
            buyer.set("user", user);
            if ($('#todo_task').val()) {
                var user = Parse.User.current();
                var todo;
                var Todo = Parse.Object.extend("todos");
                todo = new Todo();
                todo.set("status", $('#todo_status').val());
                var str = $('#todo_duedate').val();
                if (str) {
                    todo.set("duedate", new Date(str));
                }
                todo.set("task", $('#todo_task').val());
                todo.set("type", $('#todo_type').val());

                todo.set("user", user);
                buyer.save(null, {
                    success: function (buyer)
                    {
                        var buyerID = localStorage.getItem("buyerID") ? localStorage.getItem("buyerID") : buyer.id;
                        //alert(buyerID);
                        todo.set("listing_id", buyerID);
                        todo.set("listing_buyer_name", $('#first_name').val() + " " + $('#last_name').val());
                        todo.save(null, {
                            success: function (todo)
                            {
                                //localStorage.setItem("buyerID","");
                                window.location = "buyers.html#saved";
                                /*listing.set("todos_id", todo.id);
                                 listing.save(null, {
                                 success: function (listing)
                                 {
                                 window.location = "listings.html#saved";
                                 },
                                 error: function (user, error) {
                                 $("#message").html("<div class='error'>" + error.message + "</div>");
                                 hideLoader();
                                 
                                 }
                                 
                                 
                                 });*/
                                hideLoader();
                            },
                            error: function (user, error) {
                                //$("#message").html("<div class='error'>" + error.message + "</div>");
                                hideLoader();

                            }


                        });


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

            } else {



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
function checkTodos() {
    /*var user = Parse.User.current();
     var Todo = Parse.Object.extend("todos");
     var query = new Parse.Query(Todo);
     query.equalTo("status", 'yes');
     query.equalTo("user", user);
     query.find({
     success: function (todos) {
     if (todos.length > 0)
     {
     $.each(todos, function (i, todo) {
     var today = new Date().getTime();//120
     var end = new Date(todo.attributes.duedate).getTime();//110
     var total = today - end;
     if (total >= 0) {
     var ListingImages = Parse.Object.extend("todos");
     var queryImages = new Parse.Query(ListingImages);
     queryImages.equalTo("user", user);
     queryImages.get(todo.id, {
     success: function (todoUpdate) {
     todoUpdate.set("status", 'no');
     todoUpdate.save(null, {
     success: function (todo)
     {
     },
     error: function (user, error) {
     }
     });
     },
     error: function (object, error) {
     //alert('error');
     }
     });
     }
     });
     hideLoader();
     } else
     {
     hideLoader();
     }
     // userPosts contains all of the posts by the current user.
     }
     });*/
}

// Add Leads

function addlead()
{

    isLogin();
    var lead_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Lead');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_contact" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Lead = Parse.Object.extend("leads");
        var query = new Parse.Query(Lead);
        query.get(hash, {
            success: function (lead) {
                lead_obj = lead;
                $("#first_name").val(lead.attributes.first_name);
                $("#last_name").val(lead.attributes.last_name);
                $('#lead_type').val(lead.attributes.type).slider('refresh');
                $("#phonenumber").val(lead.attributes.phone_number);
                if (lead.attributes.phone_number != "")
                {
                    $('#phonenumberanchor').prop("href", "tel:" + lead.attributes.phone_number);
                }
                $("#cellnumber").val(lead.attributes.cell_number);
                if (lead.attributes.cell_number != "")
                {
                    $('#cellnumberanchor').prop("href", "tel:" + lead.attributes.cell_number);
                }
                $("#worknumber").val(lead.attributes.work_number);
                if (lead.attributes.work_number != "")
                {
                    $('#worknumberanchor').prop("href", "tel:" + lead.attributes.work_number);
                }
                $("#fax").val(lead.attributes.fax);
                $("#email").val(lead.attributes.email);
                if (lead.attributes.email != "")
                {
                    $('#emailanchor').prop("href", "mailto:" + lead.attributes.email);
                }
                $("#address").val(lead.attributes.address);
                $("#city").val(lead.attributes.city);
                $("#state").val(lead.attributes.state);
                $("#zipcode").val(lead.attributes.zipcode);
                $("#location").val(lead.attributes.location);
                $("#propertytype").val(lead.attributes.propertytype).selectmenu("refresh");
                $("#pricerange").val(lead.attributes.pricerange);
                $("#numofbedrooms").val(lead.attributes.numofbedrooms);
                $("#numofbaths").val(lead.attributes.numofbaths);
                if (lead.attributes.pool == 'on')
                {
                    $('#pool').prop('checked', true).checkboxradio('refresh');
                }
                //$("#pool").val(buyer.attributes.pool);
                $("#notes").val(lead.attributes.notes);
                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addLead").click(function () {
        if ($("#frm_addLead").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var lead;
            showLoader('Saving..');

            if (lead_obj)
            {
                lead = lead_obj;
                lead_obj = null;
            } else
            {

                var Lead = Parse.Object.extend("leads");
                lead = new Lead();
            }

            lead.set("first_name", $('#first_name').val());
            lead.set("last_name", $('#last_name').val());

            //lead.set("type", $('#lead_type').val());
            lead.set("type", 'Lead');
            lead.set("phone_number", $('#phonenumber').val());
            lead.set("cell_number", $('#cellnumber').val());
            lead.set("work_number", $('#worknumber').val());
            lead.set("fax", $('#fax').val());
            lead.set("email", $('#email').val());
            lead.set("address", $('#address').val());
            lead.set("city", $('#city').val());
            lead.set("state", $('#state').val());
            lead.set("zipcode", $('#zipcode').val());
            lead.set("location", $('#location').val());
            lead.set("propertytype", $('#propertytype').val());
            lead.set("pricerange", $('#pricerange').val());
            lead.set("numofbedrooms", $('#numofbedrooms').val());
            lead.set("numofbaths", $('#numofbaths').val());
            if ($('#pool').prop("checked"))
            {
                lead.set("pool", 'on');
            } else
            {
                lead.set("pool", 'off');
            }
            lead.set("notes", $('#notes').val());
            lead.set("user", user);
            lead.save(null, {
                success: function (lead)
                {
                    window.location = "leads.html#saved";
//                    $("#message").html("<div class='success'>Listing has been  saved successfully. </div>");
//                    emptyForm('frm_addListing');
                    hideLoader();
                },
                error: function (user, error) {
                    //alert(error.message);
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_lead').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            lead_obj.destroy({
                success: function (myObject) {
                    window.location = "leads.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}
function getLeads()
{
    isLogin();
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }

    showLoader('Loading...');
    var user = Parse.User.current();
    var Lead = Parse.Object.extend("leads");
    var query = new Parse.Query(Lead);
    query.equalTo("type", 'Lead');
    query.equalTo("user", user);
    query.find({
        success: function (leads) {
            $('#leads_listing').html('');
            if (leads.length > 0)
            {
                $.each(leads, function (i, lead) {

                    $('#leads_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="updatelead.html#' + lead.id + '">' + lead.attributes.first_name + ' ' + lead.attributes.last_name + ' - ' + lead.attributes.type + '</a></li>');

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
function showLeadMessage()
{
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        $(".ui-content").prepend("<div class='success'>Record has been " + hash + " successfully </div>");
    }
}
function updatelead()
{

    isLogin();
    var lead_obj = null;
    if (window.location.hash) {
        $('#page_title').html('Update Lead');
        $('.li_logout').before('<li class="ui-block-c"><a class="ui-link ui-btn ui-icon-check ui-btn-icon-top" id="del_contact" data-icon="delete">Delete</a></li>');
        $('#nbar ul li').css("width", '25%');

        showLoader('Loading..');

        var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character

        var Lead = Parse.Object.extend("leads");
        var query = new Parse.Query(Lead);
        query.get(hash, {
            success: function (lead) {
                lead_obj = lead;
                $("#first_name").val(lead.attributes.first_name);
                $("#last_name").val(lead.attributes.last_name);
                $('#lead_type').val(lead.attributes.type).slider('refresh');
                $("#phonenumber").val(lead.attributes.phone_number);
                if (lead.attributes.phone_number != "")
                {
                    $('#phonenumberanchor').prop("href", "tel:" + lead.attributes.phone_number);
                }
                $("#cellnumber").val(lead.attributes.cell_number);
                if (lead.attributes.cell_number != "")
                {
                    $('#cellnumberanchor').prop("href", "tel:" + lead.attributes.cell_number);
                }
                $("#worknumber").val(lead.attributes.work_number);
                if (lead.attributes.work_number != "")
                {
                    $('#worknumberanchor').prop("href", "tel:" + lead.attributes.work_number);
                }
                $("#fax").val(lead.attributes.fax);
                $("#email").val(lead.attributes.email);
                if (lead.attributes.email != "")
                {
                    $('#emailanchor').prop("href", "mailto:" + lead.attributes.email);
                }
                $("#address").val(lead.attributes.address);
                $("#city").val(lead.attributes.city);
                $("#state").val(lead.attributes.state);
                $("#zipcode").val(lead.attributes.zipcode);
                $("#location").val(lead.attributes.location);
                $("#propertytype").val(lead.attributes.propertytype).selectmenu("refresh");
                $("#pricerange").val(lead.attributes.pricerange);
                $("#numofbedrooms").val(lead.attributes.numofbedrooms);
                $("#numofbaths").val(lead.attributes.numofbaths);
                if (lead.attributes.pool == 'on')
                {
                    $('#pool').prop('checked', true).checkboxradio('refresh');
                }
                //$("#pool").val(buyer.attributes.pool);
                $("#notes").val(lead.attributes.notes);
                localStorage.setItem("leadbuyerID", lead.attributes.uniqueBuyerLead);
                hideLoader();

            },
            error: function (object, error) {
                $("#message").html("<div class='error'>" + error.message + "</div>");
                hideLoader();
            }
        });
    }

    $("#addLead").click(function () {
        if ($("#frm_addLead").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var lead;
            showLoader('Saving..');

            if (lead_obj)
            {
                lead = lead_obj;
                lead_obj = null;
            } else
            {

                var Lead = Parse.Object.extend("leads");
                lead = new Lead();
            }

            lead.set("first_name", $('#first_name').val());
            lead.set("last_name", $('#last_name').val());

            lead.set("type", $('#lead_type').val());
            lead.set("phone_number", $('#phonenumber').val());
            lead.set("cell_number", $('#cellnumber').val());
            lead.set("work_number", $('#worknumber').val());
            lead.set("fax", $('#fax').val());
            lead.set("email", $('#email').val());
            lead.set("address", $('#address').val());
            lead.set("city", $('#city').val());
            lead.set("state", $('#state').val());
            lead.set("zipcode", $('#zipcode').val());
            lead.set("location", $('#location').val());
            lead.set("propertytype", $('#propertytype').val());
            lead.set("pricerange", $('#pricerange').val());
            lead.set("numofbedrooms", $('#numofbedrooms').val());
            lead.set("numofbaths", $('#numofbaths').val());
            //var rand = randomString(12, 16);
            //localStorage.setItem("picID", randomString(12, 16));
            if ($('#pool').prop("checked"))
            {
                lead.set("pool", 'on');
            } else
            {
                lead.set("pool", 'off');
            }
            lead.set("notes", $('#notes').val());
            rand = localStorage.getItem("leadbuyerID") != "undefined" ? localStorage.getItem("leadbuyerID") : randomString(12, 16);//localStorage.setItem("leadbuyerID", lead.attributes.uniqueBuyerLead); 

            lead.set("uniqueBuyerLead", rand);
            lead.set("user", user);
            lead.save(null, {
                success: function (lead)
                {
                    //window.location = "lead_list.html#saved";
                    if ($('#lead_type').val() == 'Buyer') {
                        //alert('a');
                        leadToBuyer(rand);
                        //    localStorage.setItem("leadID", lead.id);
                    } else {
                        window.location = "lead_list.html#saved";
                    }
                    hideLoader();
                },
                error: function (user, error) {
                    //alert(error.message);
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });


        }
    });

    $('#del_lead').click(function () {


        if (confirm("Are you sure to delete this record!")) {
            showLoader('Deleting..');
            lead_obj.destroy({
                success: function (myObject) {
                    window.location = "leads.html#deleted";
                },
                error: function (myObject, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();
                }
            });

        }


    });
}

function addSettings()
{

    isLogin();
    //alert (window.location.hash);
    var setting_obj = null;
    var user = Parse.User.current();
    var Setting = Parse.Object.extend("settings");
    var query = new Parse.Query(Setting);
    //query.equalTo("status", 'yes');
    query.equalTo("user", user);
    query.find({
        success: function (setting) {
            //alert(setting.length);
            if (setting.length > 0)
            {
                $.each(setting, function (i, setting) {
                    setting_obj = setting;

                    $("#first_name").val(setting.attributes.first_name);
                    $("#last_name").val(setting.attributes.last_name);
                    $("#cellnumber").val(setting.attributes.cell_number);
                    if (setting.attributes.cell_number != "")
                    {
                        $('#cellnumberanchor').prop("href", "tel:" + setting.attributes.cell_number);
                    }
                    $("#worknumber").val(setting.attributes.work_number);
                    if (setting.attributes.work_number != "")
                    {
                        $('#worknumberanchor').prop("href", "tel:" + setting.attributes.work_number);
                    }
                    $("#fax").val(setting.attributes.fax);
                    $("#email").val(setting.attributes.email);
                    if (setting.attributes.email != "")
                    {
                        $('#emailanchor').prop("href", "mailto:" + setting.attributes.email);
                    }
                    $("#networkid").val(setting.attributes.networkid);
                    //$('#leads_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="updatelead.html#' + lead.id + '">' + lead.attributes.first_name + ' ' + lead.attributes.last_name + ' - ' + lead.attributes.type + '</a></li>');

                });
                hideLoader();
            } else
            {
                //$(".ui-content").prepend("<div class='info'>No record found. </div>");
                hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });

    $("#addSettings").click(function () {
        if ($("#frm_addSetting").validationEngine('validate'))
        {

            var user = Parse.User.current();
            var setting;
            showLoader('Saving..');

            if (setting_obj)
            {
                setting = setting_obj;
                setting_obj = null;
            } else
            {

                var Setting = Parse.Object.extend("settings");
                setting = new Setting();
            }
            setting.set("first_name", $('#first_name').val());
            setting.set("last_name", $('#last_name').val());
            setting.set("cell_number", $('#cellnumber').val());
            setting.set("work_number", $('#worknumber').val());
            setting.set("fax", $('#fax').val());
            setting.set("email", $('#email').val());
            setting.set("networkid", $('#networkid').val());
            setting.set("user", user);
            setting.save(null, {
                success: function (setting)
                {
                    alert('Your detail saved');
                    //window.location = "settings.html#saved";
                    //window.location.relod();
                    hideLoader();
                },
                error: function (user, error) {
                    $("#message").html("<div class='error'>" + error.message + "</div>");
                    hideLoader();

                }


            });
        }
    });
}
function leadToBuyer(rand)
{

    //alert(rand);
    isLogin();
    var user = Parse.User.current();
    var Buyer = Parse.Object.extend("buyers");
    var query = new Parse.Query(Buyer);
    query.equalTo("uniqueBuyerLead", rand);
    query.equalTo("user", user);
    query.find({
        success: function (buyers) {
            //alert(buyers.length);
            if (buyers.length > 0)
            {
                $.each(buyers, function (i, buyer) {
//alert(buyer.id);
                    buyer.destroy({
                        success: function (myObject) {
                            //window.location = "leads.html#deleted";
                        },
                        error: function (myObject, error) {
                            //$("#message").html("<div class='error'>" + error.message + "</div>");
                            // hideLoader();
                        }
                    });
                    //$('#buyers_listing').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false" href="addbuyer.html#' + buyer.id + '">' + buyer.attributes.first_name + ' ' + buyer.attributes.last_name + '</a></li>');

                });
                hideLoader();
            } else
            {
                //$(".ui-content").prepend("<div class='info'>No record found. </div>");
                //hideLoader();
            }
            // userPosts contains all of the posts by the current user.
        }
    });
    //var user = Parse.User.current();
    var buyer;
    var Buyer = Parse.Object.extend("buyers");
    buyer = new Buyer();

    buyer.set("first_name", $('#first_name').val());
    buyer.set("last_name", $('#last_name').val());
    buyer.set("phone_number", $('#phone_number').val());
    buyer.set("status", 'yes');
    buyer.set("lead", $('#type').val());
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
    buyer.set("uniqueBuyerLead", rand);
    buyer.set("user", user);
    buyer.save(null, {
        success: function (buyer)
        {
            window.location = "lead_list.html#saved";
        },
        error: function (user, error) {
            //$("#message").html("<div class='error'>" + error.message + "</div>");
            //hideLoader();

        }


    });
}
function shareFacebook() {
    //https://www.facebook.com/dialog/feed?app_id=735230316542815&link=http://bit.ly/1qwdXQo&caption=&description=test%20message&redirect_uri=http://www.facebook.com
    var link = "https://www.google.com/";
    window.location = "https://www.facebook.com/dialog/feed?app_id=735230316542815&link=" + link + "&caption=&description=" + message + " - " + link + "&redirect_uri=http://www.facebook.com";
    //window.open(facebook_url, '_blank', 'location=yes');

}