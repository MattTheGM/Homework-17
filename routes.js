const Workout = require('./models/workout');
const path = require('path');

// API Routes

exports.route = (app) => {

    app.get('/api/workouts', (req,res) => {
        Workout.find({})
            .then(dbWorkout => {
                res.status(200).json(dbWorkout).end();
            })
            .catch(err => {
                res.status(400).json({success: "false", err: err}).end();
            });
    });

    app.get('/api/workouts/range', (req,res) => {
        Workout.find({
            'day': {
                // less than operator
                $lte: new Date().setDate(new Date().getDate()),
                // greater than operator
                $gte: new Date().setDate(new Date().getDate()-7)
            }
        })
            .then(dbWorkout => {
                res.status(200).json(dbWorkout).end();
            })
            .catch(err => {
                res.status(400).json({success: "false", err: err}).end();
            });
    });

    app.patch('/api/workouts/:id', (req,res) => {
        Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body }}, {new: true})
            .then(dbWorkout => {
                res.status(200).json(dbWorkout).end();
            })
            .catch(err => {
                res.status(400).json({success: "false", err: err}).end();
            })
    });

    app.post('/api/workouts', (req,res) => {
        const body = req.body;
        Workout.create(body)
            .then(dbWorkout => {
                res.status(200).json(dbWorkout).end();
            })
            .catch(err => {
                res.status(400).json({success: "false", err: err}).end();
            })
    });

    // HTML Routes

    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
      });
      
    app.get('/exercise', (req,res) => {
        res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
    });
    
    app.get('/stats', (req,res) => {
        res.sendFile(path.join(__dirname, 'public', 'stats.html'));
    });

}