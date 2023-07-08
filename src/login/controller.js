const req = require('express/lib/request');
const pool = require('../../db');

const queries = require('./queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretkey = "thaksinodg";




const addUser = async(req, res) => {

    const { name, password, firstname, lastname, telephone,role } = req.body;

    //const lowEmail = emailadd.toLowerCase();

    const encryptPassword = await bcrypt.hash(password, 10);

    pool.query(queries.checkUserExist, [user_name], (error, results) => {
        if (results.rows.length) {
            res.status(200).send("Username already registed");
            // res.status(400).send( { message : "Email already registed" });
        } else {

            //  res.status(200).send("Email available");

            pool.query(queries.addUser, [user_name, encryptPassword, firstname, lastname,telephone, role], (error, results) => {
                if (error) throw error;
                // res.status(201).send(  { message : "User Register Successfull" } );
                res.status(201).send("User Register Successfull");
            })

        }
    })
}

const CallTruck = async(req, res) => {


    jwt.verify(req.token, secretkey, (err, authData) => {

        //  const staffid = authData.id
        const staffbranch = authData.branch
        if (err) {
            res.sendStatus(403);
        } else {

            pool.query(queries.getCalltruck, [staffbranch], (error, results) => {
                if (error) throw error;

                if (results.rows.length) {

                    res.status(200).json(results.rows);


                } else {
                    res.status(200).send("no item");
                }


            })

        }
    });



};




const checkUser = async(req, res) => {

    const { loginuser, logpassword } = req.body;
    

    pool.query(queries.checkUserPassword, [loginuser], (error, results) => {
        if (results.rows.length) {

            const users = results.rows[0];

            console.log(users);


            bcrypt.compare(logpassword,users.password, (error, isMatch) => {

                if (isMatch) {
                    // const genkey = crypto.randomBytes(32).toString('hex');
                    const accessToken = jwt.sign({ id: users.user_name }, secretkey, { expiresIn: "2h" });

                    res.status(200).json([{ accessToken }])

                } else {
                    res.status(200).send("wrong password");
                }
            })


            // res.status(200).json(results.rows)
        } else {
            res.status(200).send("no  user");
        }
    })

}




const listBillheaderAccepted = async(req, res) => {
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const ridderid = rstoken.id;
        if (err) {
            res.status(201).json("token Expire");
        } else {
            pool.query(queries.showBillheaderacceptByRider, [ridderid], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).send("no item");
                }
            })
        }
    })
}


const calltest = async(req, res) => {
    // Mock user

    const staffid = 15;

    pool.query(queries.getCalltruck, [staffid], (error, results) => {
        if (error) throw error;

        if (results.rows.length) {

            res.status(200).json(results.rows);


        } else {
            res.status(200).send("no item");
        }


    })


}



const acceptcalltruck = async(req, res) => {
    const { billheader } = req.body;
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const staffid = rstoken.id
        if (err) {
            res.status(201).json("token Expire");
        } else {

            pool.query(queries.acceptCalltruck, [staffid, billheader], (error, results) => {
                const rsshow = results.rowCount;
                if (error) {
                    res.status(201).json("update faild");
                    throw error;
                } else {
                    if (results.rowCount >= 1) {
                        res.status(201).json("update done");
                    } else {
                        res.status(201).json("no row effect");
                    }
                }
            })
        }
    });

}


const cancel_call_truck = async(req, res) => {
    const { billheader } = req.body;
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const staff_id = rstoken.id
        if (err) {
            res.status(201).json("token Expire");
        } else {
            pool.query(queries.cancel_acceptCalltruck, [billheader, staff_id], (error, results) => {
                if (error) {
                    res.status(201).json("update faild");
                    throw error;
                } else {
                    if (results.rowCount >= 1) {
                        res.status(201).json("update done");
                    } else {
                        res.status(201).json("no row effect");
                    }
                }
            })
        }
    });
}
const cancel_call_item = async(req, res) => {


    const { billheader } = req.body;
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const staff_id = rstoken.id
        if (err) {
            res.status(201).json("token Expire");
        } else {
            pool.query(queries.cancel_acceptcalitem, [billheader, staff_id], (error, results) => {
                if (error) {
                    res.status(201).json("update faild");
                    throw error;
                } else {
                    if (results.rowCount >= 1) {
                        res.status(201).json("update done");
                    } else {
                        res.status(201).json("no row effect");
                    }
                }
            })
        }
    });

}


const billlistforReprint = async(req, res) => {
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const riderid = rstoken.id;
        if (err) {
            res.status(201).json("token Expire");
        } else {
            pool.query(queries.listbillforprint, [riderid], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).send("no item");
                }
            })
        }
    })

}

const detailbillPrint = async(req, res) => {
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        const { billheader } = req.body;
        if (err) {
            res.status(201).json("token Expire");
        } else {
            pool.query(queries.detailListbillPrint, [billheader], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).send("no item");
                }
            })
        }
    })

}

const showDetailItemCalltruck = async(req, res) => {
    const { billinvoice } = req.body;
    jwt.verify(req.token, secretkey, (err, rstoken) => {
        if (err) {
            res.status(200).json("token expire");
        } else {
            pool.query(queries.showDetailItemCalltruck, [billinvoice], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).send("no item");
                }

            })
        }

    })

}
const updateCallTruckBillDetail = async(req, res) => {
    const { billid, itemname, types, weight, sizes, quantity, totalbill, currncy, exprice, codprice, codst, truckprice, headerbill } = req.body;

    pool.query(queries.updateCallTruckBillDetail, [billid, itemname, types, weight, sizes, quantity, totalbill, currncy, exprice, codprice, codst, truckprice], (error, results) => {
        if (error) {
            res.status(200).json("detail bill error update");
            throw error;
        } else {
            if (results.rowCount == 1) {

                pool.query(queries.caculatebilltotalcalltruck, [headerbill], (error, results) => {

                        const dataprice = results.rows[0].price_header_truck;
                        if (error) {
                            res.status(200).json("header bill error select");
                            throw error;
                        }
                        if (results.rows.length) {



                            pool.query(queries.updatebillheaderprice, [dataprice, headerbill], (error, results) => {
                                if (error) throw error;
                                if (results.rowCount == 1) {

                                    res.status(200).json("update done");
                                } else {
                                    res.status(200).json("error Last qeury");
                                }

                            })


                            // const priceheader = results.rows;

                            // res.status(200).send(priceheader);
                        }
                    })
                    //   res.status(200).json("data bill detail has update");
            } else {
                res.status(200).json("no data to update")
            }
        }


    })
}

const confirmCheckItemdone = async(req, res) => {

    const { bheader } = req.body;

    pool.query(queries.updatebillCustomerStatus, [bheader], (error, results) => {
        if (error) throw error;
        if (results.rowCount >= 1) {
            pool.query(queries.updatebillheaderStatus, [bheader], (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {
                    res.status(200).json("bill header and bill detail has update");
                }
            })

        } else {
            res.status(200).json("error update bill detail qeury");
        }
    })
}


const callListItemCallTruck = async(req, res) => {
    const { billheader } = req.body;
    pool.query(queries.getListItemCalltruck, [billheader], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).send("no item");
        }
    })
}


const showListcalltruckforpayment = async(req, res) => {
    jwt.verify(req.token, secretkey, (err, restoken) => {
        if (err) {
            res.status(200).json("expire token");
            throw err;
        }
        const ridderid = restoken.id;
        pool.query(queries.showListpaycashcalltruck, [ridderid], (error, results) => {
            if (error) throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows);
            } else {
                res.status(200).json("no data to show")
            }
        })
    })
}

const showListdetailcalltruckforpayment = async(req, res) => {
    const { billheader } = req.body;
    pool.query(queries.showlistbilldetailcaltruckforpay, [billheader], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).json("no data show");
        }
    })
}

const showlistcallitemfrombranch = async(req, res) => {
    jwt.verify(req.token, secretkey, (errtoken, restoken) => {
        const rcbranch = restoken.branch;
        if (errtoken) {
            res.status(200).json("expire token");
        } else {

            pool.query(queries.listcallitemfrombranch, [rcbranch], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).json("no data show");
                }
            })

        }

    })

}
const showlistcallitemdetail = async(req, res) => {
    const { billinvoice } = req.body;
    pool.query(queries.getlistcallitem, [billinvoice], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        }
    })
}

const showdetailitemcall = async(req, res) => {
    const { billid } = req.body;
    pool.query(queries.showdetailcallitem, [billid], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        }
    })
}




const updatebillcallitemdetail = async(req, res) => {
    const { billid, totalprice, callitemprice, invoicecallitem } = req.body;
    pool.query(queries.caculatebillcallitem, [billid, callitemprice, totalprice], (error, results) => {
        if (error) throw error;
        if (results.rowCount >= 1) {
            // res.status(200).json("update done")
            pool.query(queries.caculatebilltotalcallitem, [invoicecallitem], (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {

                    const totalprice = results.rows[0].price_invoice_call;
                    pool.query(queries.updatebillcallitemprice, [totalprice, invoicecallitem], (error, results) => {
                        if (error) throw error;
                        if (results.rowCount == 1) {
                            res.status(200).json("update done");
                        } else {
                            res.status(200).json("last update error");
                        }
                    })



                } else {
                    res.status(200).json("no row")
                }
            })
        } else {
            res.status(200).json("no update");
        }
    })
}

const confirmcheckcallitem = async(req, res) => {
    const { billinvoice } = req.body;
    pool.query(queries.confircheckallitemdetail, [billinvoice], (error, results) => {
        if (error) throw error;
        if (results.rowCount >= 1) {
            pool.query(queries.confirmcheckcallitemheader, [billinvoice], (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {
                    res.status(200).json("update done")
                } else {
                    res.status(200).json("no header update")
                }
            })
        } else {
            res.status(200).json("no detail update")
        }
    })
}

const paycashitemcall = async(req, res) => {
    const { billinvoice } = req.body;
    pool.query(queries.payforitemcalldetail, [billinvoice], (error, results) => {
        if (error) throw error;
        if (results.rowCount >= 1) {
            pool.query(queries.payforitemcallheader, [billinvoice], (error, results) => {
                if (error) throw error;
                if (results.rowCount == 1) {
                    res.status(200).json("update done")
                } else {
                    res.status(200).json("no header update");
                }
            })
        } else {
            res.status(200).json("no detail update")
        }
    })
}


const showcalitemlistDetail = async(req, res) => {
    const { invoiceheader } = req.body;
    pool.query(queries.showDetailItemCallItemList, [invoiceheader], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).json("no data show");
        }
    });
}



const postda = (req, res) => {
    // Mock user
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });


}

const paymentcalltruckbyrider = async(req, res) => {
    const { billheader } = req.body;
    pool.query(queries.paycashcallitembillheader, [billheader], (error, results) => {
        if (error) throw error;
        if (results.rowCount == 1) {
            pool.query(queries.paycashcallitembilldetail, [billheader], (error, results) => {
                if (error) throw error;
                if (results.rowCount >= 1) {
                    res.status(200).json("data has update");
                } else {
                    res.status(200).json("no payment list bill detail");
                }
            })
        } else {
            res.status(200).json("no payment form bill header");
        }
    })
}
const acceptcalitem = async(req, res) => {
    const { billinvoice } = req.body;
    jwt.verify(req.token, secretkey, (errortoken, restoken) => {
        const rctoken = restoken.id;
        if (errortoken) {
            res.status(200).json("expire token");
        } else {
            pool.query(queries.acceptcalitem, [rctoken, billinvoice], (error, results) => {

                if (error) {
                    res.status(201).json("update faild");
                    throw error;
                } else {
                    if (results.rowCount >= 1) {
                        res.status(201).json("update done");
                    } else {
                        res.status(201).json("no row effect");
                    }
                }

            })
        }
    })
}

const showListCallItemPrepay = async(req, res) => {
    jwt.verify(req.token, secretkey, (errortoken, restoken) => {
        const riiderid = restoken.id;
        if (errortoken) {
            res.status(200).json("expire token");
        } else {


            pool.query(queries.showListpaycashcallItem, [riiderid], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).json("no data show");
                }
            })
        }


    })
}

const showCallTruckLocation = async(req, res) => {
    const { billheaderid } = req.body;
    pool.query(queries.locationCallTruck, [billheaderid], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).json("no data show");
        }
    });
}

const showbillinvoicecallitemacceptridder = async(req, res) => {
    jwt.verify(req.token, secretkey, (errortoken, restoken) => {
        const riiderid = restoken.id;
        if (errortoken) {
            res.status(200).json("expire token");
        } else {


            pool.query(queries.showlistacceptcallitem, [riiderid], (error, results) => {
                if (error) throw error;
                if (results.rows.length) {
                    res.status(200).json(results.rows);
                } else {
                    res.status(200).json("no data show");
                }
            })
        }


    })
}

const mt_list_dropdown = async(req, res) => {

    pool.query(queries.tb_material_type_list, (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).send("no item");
        }
    })

}

const product_list_dropdown = async(req, res) => {
    const { cateid } = req.body;
    pool.query(queries.product_list_qr, [cateid], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(200).json(results.rows);
        } else {
            res.status(200).send("no item");
        }
    })

}


module.exports = {

    addUser,
    checkUser,
    CallTruck,
    calltest,
    callListItemCallTruck,
    acceptcalltruck,
    postda,
    listBillheaderAccepted,
    showDetailItemCalltruck,
    updateCallTruckBillDetail,
    confirmCheckItemdone,
    showListcalltruckforpayment,
    showListdetailcalltruckforpayment,
    paymentcalltruckbyrider,
    showlistcallitemfrombranch,
    showlistcallitemdetail,
    acceptcalitem,
    showbillinvoicecallitemacceptridder,
    showdetailitemcall,
    updatebillcallitemdetail,
    confirmcheckcallitem,
    paycashitemcall,
    showcalitemlistDetail,
    showListCallItemPrepay,
    showCallTruckLocation,
    billlistforReprint,
    detailbillPrint,
    cancel_call_truck,
    cancel_call_item,
    mt_list_dropdown,
    product_list_dropdown,
}