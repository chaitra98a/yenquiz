@app.route('/submit', methods=['POST'])
def submit_flag():
    if 'user_id' not in session:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json()
    user = User.query.get(session['user_id'])
    
    responses = []
    for flag_submission in data['flags']:
        challenge = Challenge.query.filter_by(id=flag_submission['challenge_id']).first()
        
        if challenge and challenge.flag == flag_submission['flag']:
            existing_submission = Submission.query.filter_by(user_id=user.id, challenge_id=challenge.id).first()
            if not existing_submission:
                user.score += challenge.points
                db.session.add(Submission(user_id=user.id, challenge_id=challenge.id))
                db.session.commit()
                responses.append({'challenge_id': challenge.id, 'message': f'Correct! +{challenge.points} points'})
            else:
                responses.append({'challenge_id': challenge.id, 'message': 'Already solved'})
        else:
            responses.append({'challenge_id': flag_submission['challenge_id'], 'message': 'Incorrect flag'})

    return jsonify({'results': responses}), 200
