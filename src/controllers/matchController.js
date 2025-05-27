import { matchDesks } from '../services/matcher.js';

/**
 * POST /api/match
 * – employeeId is optional (must be string if present)
 * – query is required (non-empty string, max 200 chars)
 */
export async function matchDesksHandler(req, res) {
    let { employeeId, query } = req.body;

    // Validate employeeId if provided
    if (employeeId !== undefined) {
        if (typeof employeeId !== 'string') {
            return res.status(400).json({ success: false, error: 'employeeId must be a string' });
        }
        employeeId = employeeId.trim();
        if (!employeeId) employeeId = undefined;
    }

    // Validate query
    if (typeof query !== 'string') {
        return res.status(400).json({ success: false, error: 'query must be a string' });
    }
    query = query.trim();
    if (!query) {
        return res.status(400).json({ success: false, error: 'query cannot be empty' });
    }
    if (query.length > 200) {
        return res
            .status(400)
            .json({ success: false, error: 'query too long (max 200 characters)' });
    }

    try {
        const data = await matchDesks({ employeeId, query });

        if (data.length === 0) {
            // No candidates matched
            return res.json({
                success: true,
                message: 'No desks found matching your criteria',
                data: []
            });
        }

        // At least one desk matched
        return res.json({
            success: true,
            message: `Found ${data.length} desk${data.length > 1 ? 's' : ''}`,
            data
        });

    } catch (err) {
        console.error('Matcher error:', err);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }








}