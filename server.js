import dotenv from 'dotenv'
dotenv.config();

import axios from 'axios';
import express from "express";

const app = express();

app.use(express.static('public'))


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

export const getPage = async (pageID) => {
    try {
        const response = await api.get(`/pages/${pageID}`);
        return response.data
    } catch (error) {
        console.error(`Error fetching page for ID ${pageID}`)
        throw error
    }
}

app.get(`/:pageId`, async (req, res) => {
    try {
        const page = await getPage(req.params.pageId);
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


