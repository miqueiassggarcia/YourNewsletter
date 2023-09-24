// recebe um date, e um total de minutos: retorna uma nova data que reflete 
// current_date + minutes
exports.time_in_future = function (current_date, minutes) {
    let expiry_time = new Date(current_date.getTime() + minutes * 60000);
    return expiry_time;
}

// retorna true se current_date >= limit_date
exports.is_late = function (current_date, limit_date) {
    return current_date >= new Date(limit_date);
}