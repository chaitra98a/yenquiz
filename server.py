from flask import Flask, request, jsonify

app = Flask(__name__)

# Correct flags and their corresponding scores
correct_flags = {
    "flag1": "FLAG{LEVEL1_SECRET}",
    "flag2": "FLAG{LEVEL2_SECRET}",
    "flag3": "FLAG{LEVEL3_SECRET}",
    "flag4": "FLAG{LEVEL4_SECRET}"
}

flag_points = { "flag1": 20, "flag2": 30, "flag3": 44, "flag4": 53 }

# In-memory scoreboard
scoreboard = []

@app.route("/submit", methods=["POST"])
def submit_flag():
    data = request.json
    team_name = data.get("teamName")
    submitted_flags = data.get("flags")

    if not team_name or not submitted_flags:
        return jsonify({"message": "Invalid submission"}), 400

    score = 0
    result_message = ""

    for flag_key, flag_value in submitted_flags.items():
        if flag_value == correct_flags.get(flag_key, ""):
            score += flag_points[flag_key]
            result_message += f"✅ {flag_key.upper()} Correct! +{flag_points[flag_key]} Points<br>"
        else:
            result_message += f"❌ {flag_key.upper()} Incorrect!<br>"

    # Update scoreboard
    existing_team = next((team for team in scoreboard if team["name"] == team_name), None)
    if existing_team:
        existing_team["score"] += score
    else:
        scoreboard.append({"name": team_name, "score": score})

    result_message += f"<br><strong>Total Score: {score} Points</strong>"
    return jsonify({"message": result_message})

@app.route("/scoreboard", methods=["GET"])
def get_scoreboard():
    return jsonify(sorted(scoreboard, key=lambda x: x["score"], reverse=True))

if __name__ == "__main__":
    app.run(debug=True)
