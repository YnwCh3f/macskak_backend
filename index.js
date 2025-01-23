import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let macskak = [
    { id: 1, nev: "Cirmos", kor: 2, szin: "szürke" }
];

const indexOf = id => {
    let i = 0;
    while(macskak[i].id != id && i < macskak.length) i++;
    return i < macskak.length ? i : -1;
}

let nextId = 2;

const addMacska = (req, res) => {
    if (!(req.body.nev && req.body.kor && req.body.szin)){
        res.status(400).send({ error : "Hibás paraméterek!" });
        return;
    }
    const macska = {
        id: nextId++,
        nev: req.body.nev,
        kor: req.body.kor,
        szin: req.body.szin
    }
    macskak.push(macska);
    res.status(200).send({ status: "OK" });
}

const delMacska = (req, res) => {
    if (!req.params.id){
        res.status(400).send({ error : "Hibás paraméter!" });
        return;
    }
    if (indexOf(req.params.id) == -1){ 
        res.status(400).send({ error : "Nem létező ID!" });
        return;
    }
    macskak.splice(indexOf(req.params.id), 1);
    res.status(200).send({ status: "OK" });
}

const modMacska = (req, res) => {
    if (!(req.body.id && req.body.nev && req.body.kor && req.body.szin)){
        res.status(400).send({ error : "Hibás paraméterek!" });
        return;
    }
    macskak[indexOf(req.body.id)].nev = req.body.nev;
    macskak[indexOf(req.body.id)].kor = req.body.kor;
    macskak[indexOf(req.body.id)].szin = req.body.szin;
    res.status(200).send({ status: "OK" });
}


app.get("/", (req, res) => res.send("<h1>Macskák v1.0.0</h1>"));
app.get("/macskak", (req, res) => res.send(macskak));
app.post("/macska", addMacska);
app.delete("/macska/:id", delMacska);
app.put("/macska", modMacska);

app.listen(88, err => err ? console.log(err) : console.log("Server runnin' on port :88"));
