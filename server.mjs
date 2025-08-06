import express from 'express';

const PORT=process.env.PORT || 5000;

const app=new express();

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})