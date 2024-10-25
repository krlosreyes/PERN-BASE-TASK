import {
    pool
} from '../db.js';

export const getAllTasks = async (req, res) => {
    const result = await pool.query('SELECT * FROM task');
    console.log(result.rows)
    return res.json(result.rows);
};

export const getTask = async (req, res) => {
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [req.params.id, ]);
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "Task whith this id no exist"
        })
    }
    return res.json(result.rows[0]);
};

export const createTask = async (req, res, next) => {
    const {
        title,
        description
    } = req.body;
    //db insert
    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1,$2) RETURNING *', [title, description]);
        res.json(result.rows[0])
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Task already exists"
            });
        }
        next(error);
    }
};

export const updateTask = (req, res) => res.send('Updating Task By Id');

export const deleteTask = async (req, res) => {
    const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [req.params.id])
    console.log(result)
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "There is no task with that ID",
        })
    }
    return res.send(`Tarea ${req.params.id} Eliminada`)
}