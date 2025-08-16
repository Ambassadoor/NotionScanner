import dotenv from 'dotenv'
dotenv.config();

import axios from 'axios';
import express from "express";
import multer from "multer";

import { newPageFormatter } from './src/helpers/newPageFormatter.js';


const app = express();
const upload = multer({ dest: 'uploads/'})

app.use(express.static('src'))
app.use(express.json())



const port = process.env.PORT;
const apiKey = process.env.NOTION_SECRET;
const DbId = process.env.NOTION_DB_ID;
const url = process.env.NOTION_URL;
const version = "2022-06-28"

const api = axios.create({
    baseURL: url,
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        "Notion-Version": version,
        "Content-Type": "application/json"
    }
})

const getDBProperties = async (ID) => {
    try {
        const response = await api.get(`/databases/${ID}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching properties for ID ${ID}`)
        throw error
    }
};

const getPage = async (pageID) => {
    try {
        const response = await api.get(`/pages/${pageID}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching page for ID ${pageID}`)
        throw error
    }
}

const updateWeight = async (pageID, weight) => {
    try {
        const response = await api.patch(`/pages/${pageID}`, {
            "properties" : {
                "Current Weight" : { "number" : Number(weight)  }
            }
        });  
        return response.data      
    } catch (error) {
        if (error.response) {
            console.error(`Error status:`, error.response.status)
            console.error(`Error data:`, error.response.data)
        } else {
            console.error(`Error updating weight ${error.message}`)
        }
        throw error
    }
}

const createNewPage = async (formData) => {
    const data = newPageFormatter(formData, DbId)

    try {
        const response = await api.post(`/pages`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            console.error(`Error status:`, error.response.status)
            console.error(`Error data:`, error.response.data)
        }
    }



}

app.get(`/api/config`, (req, res) => {
    res.json({
        prefix: process.env.PREFIX || "^",
        suffix: process.env.SUFFIX || "Enter"
    })
})

app.get(`/api/:pageId`, async (req, res) => {
    try {
        const page = await getPage(req.params.pageId);
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.get(`/api/updateWeight/:pageId/:weight`, async (req, res) => {
    try {
        const { pageId, weight} = req.params;
        const update = await updateWeight(pageId, weight)
        res.json(update)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.post(`/api/newPage`, upload.single('safetyDataSheet'), async (req, res) => {
    const sds = req.file;
    try {
        const formData = req.body;
        const pageConfirmation = await createNewPage(formData)
        res.json(pageConfirmation)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


