
const express = require('express');
const router = express.Router();
const {auth} =require('.././middleware/auth');
const {Alarm} = require("../models/alarm");
const {EveryDay} = require("../models/everyDay");

router.post("/enroll",auth,(req,res) =>{//기기 등록
   
    const serialNum = req.body.serialNum;
    const userInfo = req.body.localUserInfo;
    console.log(serialNum,userInfo)

    const everyDay =new EveryDay({serialNum:serialNum})
    everyDay.save((err,everym)=>{
        console.log(err)
        if(err) return res.status(400).json({success:false ,err})
       
        
        console.log(everym)
        return res.status(200).json({success:true,serialNum:everym.serialNum})
    })
   
})
router.post("/check",(req,res) =>{ // 기기 정보 가져옮  description 용도
   
    const serialNum = req.body.serialNum
    EveryDay.findOne({serialNum : serialNum},(err,everym)=>{
        console.log(everym)
        if(!everym) return res.status(200).json({success:false ,err})
        return res.status(200).json({success:true});
    })
})

router.post("/save",(req,res) =>{ // 기기 정보 가져옮  description 용도
   
    const serialNum = req.body.serialNum
    console.log(req.body.description)
    EveryDay.findOne({serialNum : serialNum},function(err,everym){
        
        if(!everym) return res.status(200).json({success:false ,err})
        console.log("everym",everym)
        everym.description = req.body.description;
        everym.owner = req.body.owner;
        everym.save((err)=>{
            if(err) return res.status(200).json({success:false ,err})
        })
        return res.status(200).json({success:true});
    })
})

router.post("/getAlarm",(req,res) =>{
 
})


router.post("/geteveryDay",(req,res) =>{ // 기기 정보 가져옮  description 용도
   
    const userId = req.body.userId
    console.log("asdf",userId)
    EveryDay.findOne({owner : userId},(err,everDay)=>{
        if(!everDay) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true,everDayInfo: everDay})
    })
})

router.post("/stateeveryDay",(req,res) =>{//기기 상태확인 polling 방식
   const everyDayId =  req.body.everDayId;
   console.log(everyDayId)
   EveryDay.findOne({_id : everyDayId},(err,everyDay)=>{
    if(!everyDay) return res.status(400).json({success:false, err})
    else {
        everyDay.state = true;
        everyDay.toggle =  !everyDay.toggle;
        everyDay.save((err)=>{
            if(err) return res.status(400).json({success:false,err});
            return res.status(200).json({success:true});
        })
    }
})
 
})
module.exports = router;