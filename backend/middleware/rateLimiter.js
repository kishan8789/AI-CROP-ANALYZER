const requestCounts = new Map();

function rateLimiter({ windowMs, max }) {
    return (req, res, next) => {
        const key = req.ip || req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        const current = requestCounts.get(key);

        if (!current || now - current.start >= windowMs) {
            requestCounts.set(key, { start: now, count: 1 });
            return next();
        }

        current.count += 1;

        if (current.count > max) {
            const retryAfter = Math.ceil((windowMs - (now - current.start)) / 1000);
            res.set('Retry-After', String(retryAfter));
            return res.status(429).json({
                message: 'Too many requests. Please try again later.',
            });
        }

        return next();
    };
}

module.exports = rateLimiter;