import cluster from 'cluster'
import os from 'os'

const CPUS = os.cpus()

if(cluster.isMaster) {
    CPUS.forEach(() => cluster.fork() )

    cluster.on('listening', worker => {
        console.log('Cluster %d connected', worker.process.pid)
    })

    cluster.on('disconnect', worker => {
        console.log('Cluster %d disconnected', worker.process.pid)
    })

    cluster.on('exit', worker => {
        console.log('Cluster %d went down', worker.process.pid)
        cluster.fork() //It makes sure that a new cluster restarts if an old one went down
    })
} else {
    require('./index.js')
}
