import {
    pool
} from '../db.js';

export const getAllTasks = async (req, res) => {
    console.log(req.userId, req.userName);
    const result = await pool.query('SELECT * FROM task WHERE user_id = $1',[req.userId, ]);
    //console.log(result.rows)
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
        const result = await pool.query('INSERT INTO task (title, description, user_id) VALUES ($1,$2,$3) RETURNING *', [title, description, req.userId]);
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

export const updateTask = async (req, res) => {
    const id = req.params.id;
    const {
        title,
        description
    } = req.body;

    const result = await pool.query("UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);

    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "The task dont be Updated",
        });
    }
    return res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
    const result = await pool.query('DELETE FROM task WHERE id = $1', [req.params.id])
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "There is no task with that ID",
        })
    }
    return res.sendStatus(204);
}