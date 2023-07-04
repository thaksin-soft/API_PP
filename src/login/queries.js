 const checkUserPassword = "SELECT * FROM tbl_user where user_name = $1 ";
 const checkUserExist = "SELECT * FROM tbl_user where user_name = $1";
 const addUser = " INSERT INTO tbl_user(user_name, password,first_name,last_name,telephone,role,created_date)   VALUES ($1, $2, $3,$4, $5, $6,now())";


/// sale dayry
 const getCalltruck = "SELECT distinct a.bill_header as bill_header,bill_total  FROM  tbl_bill_header a left join tb_customer_deposit b on a.bill_header = b.bill_header  where origin_branch_name = $1 and bh_status =1 and rc_ridder is null";

 const getListItemCalltruck = " SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,    create_date, ccy,   cod  FROM   tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where bill_header =$1 ";
 const acceptCalltruck = "update tbl_bill_header set rc_ridder =$1 where bill_header = $2 ";
 const showBillheaderacceptByRider = " SELECT distinct a.bill_header as bill_header,bill_total,rc_ridder  FROM  tbl_bill_header a left join tb_customer_deposit b on a.bill_header = b.bill_header where bh_status =1 and rc_ridder  = $1";
 const showDetailItemCalltruck = " SELECT  a.bill_code as bill_code,bill_header, mtl_name, mt_name,mtl_type, (case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, " +
     " mtl_am, mtl_total_price,  a.create_date, ccy, express_price, cod_price, cod, vehicle_price  FROM tb_material a  left join tb_customer_deposit b on a.bill_code = b.bill_code " +
     " left join tb_material_type c on a.mtl_type = cast(c.mt_id as varchar) where a.bill_code =  $1 ";

 const updateCallTruckBillDetail = " update tb_material set mtl_name = $2 , mtl_type = $3, mtl_weight = $4, mtl_size = $5, mtl_am = $6, " +
     " mtl_total_price = $7, ccy = $8, express_price = $9, cod_price = $10, cod = $11, vehicle_price = $12  where bill_code = $1";
 const caculatebilltotalcalltruck = "SELECT    sum(mtl_total_price) as price_header_truck  FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code " +
     " where bill_header = $1 group by bill_header";
 const updatebillheaderprice = "update  tbl_bill_header set bill_total = $1 where bill_header = $2";
 const updatebillheaderStatus = "update  tbl_bill_header set bh_status = 2 where bill_header = $1";
 const updatebillCustomerStatus = "update tb_customer_deposit set transfer_status = 3 where bill_header = $1"
 const showListpaycashcalltruck = "SELECT bill_header,   bill_total  FROM tbl_bill_header where bh_status = 2  and rc_ridder =$1";
 const showlistbilldetailcaltruckforpay = "SELECT a.bill_code as bill_code, mtl_name,bill_header, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,  " +
     "  create_date, ccy,   cod  FROM   tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where  bill_header = $1 and transfer_status = 3";

 const paycashcallitembillheader = "update  tbl_bill_header set bh_status = 3 where bill_header = $1";
 const paycashcallitembilldetail = "update tb_customer_deposit set transfer_status = 4 where bill_header = $1"

 const listcallitemfrombranch = "SELECT  distinct inv_id, inv_total,destination_branch_id FROM tbl_invoice_call_item a left join tb_customer_deposit b on a.inv_id = b.invoice_call_item where  destination_branch_id = $1 and rc_ridder is null";
 const getlistcallitem = "SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,  " +
     " create_date, ccy, cod  FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where invoice_call_item = $1";
 const acceptcalitem = "update tbl_invoice_call_item set rc_ridder =$1 where inv_id = $2 ";
 const showlistacceptcallitem = "  SELECT distinct inv_id,inv_total FROM  tbl_invoice_call_item a left join tb_customer_deposit b on a.inv_id = b.invoice_call_item where inv_status =1 and rc_ridder  = $1";
 const showdetailcallitem = "SELECT  a.bill_code as bill_code,invoice_call_item, mtl_name, mtl_type, mtl_weight, mtl_size, mtl_am, mtl_total_price,  create_date, ccy, express_price, cod_price, cod, vehicle_price,callitem_price " +
     " FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where a.bill_code =  $1 ";
 const caculatebillcallitem = " update tb_material set  mtl_total_price = $3,  callitem_price = $2  where bill_code = $1";
 const caculatebilltotalcallitem = "SELECT    sum(mtl_total_price) as price_invoice_call FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code  where invoice_call_item = $1 group by invoice_call_item";
 const updatebillcallitemprice = "update  tbl_invoice_call_item set inv_total = $1 where inv_id = $2";
 const confirmcheckcallitemheader = "update  tbl_invoice_call_item set inv_status =2 where inv_id = $1";
 const confircheckallitemdetail = "update tb_customer_deposit set transfer_status = 6 where invoice_call_item = $1";
 const payforitemcallheader = "update  tbl_invoice_call_item set inv_status =3 where inv_id = $1";
 const payforitemcalldetail = "update tb_customer_deposit set transfer_status = 7 where invoice_call_item = $1";
 const showDetailItemCallItemList = " SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price, " +
     " create_date, ccy,   cod  FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where invoice_call_item =$1  ";

 const showListpaycashcallItem = "SELECT inv_id, inv_total FROM tbl_invoice_call_item where inv_status = 2  and rc_ridder =$1";

 const locationCallTruck = "SELECT ST_X(geolocation::geometry) as landx, ST_Y(geolocation::geometry) as landy FROM tb_locations where bill_code =$1";

 const listbillforprint = "SELECT inv_id, inv_total, inv_date, inv_time,'call-item' as bill_type FROM   tbl_invoice_call_item  where inv_status = 3 and rc_ridder =$1  " +
     " union all " +
     " SELECT bill_header,   bill_total, bh_date, bh_time ,'call-truck' as bill_type FROM   tbl_bill_header where bh_status = 3 and rc_ridder =$1"

 const detailListbillPrint = "  SELECT distinct  cast(add_date as varchar(30)) as add_date,a.bill_code as bill_code, mtl_cusdeposit_fname, " +
     " mobi_cusdeposit_number, b.branch_name as origin_branch_name,b.branch_tel as origin_branch_tel, " +
     " mtl_recipient_name,mtl_recipient_tel, c.branch_name as destination_branch_name,c.branch_tel as destination_branch_tel , " +
     " mtl_name,cast(mtl_am as varchar(10)) as mtl_am,mt_name, (case when status_pay = '1' then 'ຕົ້ນທາງ' else 'ປາຍທາງ' end) as status_pay, " +
     " (case when status_pay = '1' then mtl_total_price else 0 end) as from_pay, " +
     " (case when status_pay = '2' then mtl_total_price else 0 end) as to_pay, tfs_name " +
     " FROM   tb_customer_deposit a  " +
     " left join tb_branch b on a.origin_branch_name = b.branch_id   " +
     " left join tb_branch c on a.destination_branch_id = c.branch_id  " +
     " left join tb_material d on a.bill_code = d.bill_code " +
     " left join tb_material_type e on d.mtl_type = cast(e.mt_id as varchar) " +
     " left join tbl_transfer_status f on a.transfer_status = f.tfs_id " +
     " where bill_header =$1 or invoice_call_item = $1 ";

 const cancel_acceptCalltruck = "update tbl_bill_header set rc_ridder = null where bill_header = $1 and rc_ridder =$2 ";
 const cancel_acceptcalitem = "update tbl_invoice_call_item set rc_ridder = null where inv_id = $1 and rc_ridder =$2 ";

 const tb_material_type_list = "SELECT  cast ( mt_id as varchar) as mt_id,mt_name  FROM tb_material_type";


 const product_list_qr = "select '0' as pd_id, 'ເລືອກລາຍການ' as doctype_name " +
     "union all   " +
     "  SELECT cast(pd_id as varchar) as pd_id, doctype_name  " +
     " FROM tb_price_document  where pd_type_id = $1 and status_brch = '1' ";

 module.exports = {

     checkUserPassword,
     checkUserExist,
     addUser,
     getCalltruck,
     getListItemCalltruck,
     acceptCalltruck,
     showBillheaderacceptByRider,
     showDetailItemCalltruck,
     updateCallTruckBillDetail,
     caculatebilltotalcalltruck,
     updatebillheaderprice,
     updatebillheaderStatus,
     updatebillCustomerStatus,
     showListpaycashcalltruck,
     showlistbilldetailcaltruckforpay,
     paycashcallitembillheader,
     paycashcallitembilldetail,
     listcallitemfrombranch,
     getlistcallitem,
     acceptcalitem,
     showlistacceptcallitem,
     showdetailcallitem,
     caculatebillcallitem,
     caculatebilltotalcallitem,
     updatebillcallitemprice,
     confirmcheckcallitemheader,
     confircheckallitemdetail,
     payforitemcallheader,
     payforitemcalldetail,
     showDetailItemCallItemList,
     showListpaycashcallItem,
     locationCallTruck,
     listbillforprint,
     detailListbillPrint,
     cancel_acceptCalltruck,
     cancel_acceptcalitem,
     tb_material_type_list,
     product_list_qr,
 };