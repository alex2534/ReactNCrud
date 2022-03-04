/** @format */

import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [courseGoals, setCourseGoals] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = (goalTitle) => {
		setCourseGoals((currentGoals) => [
			...currentGoals,
			{ id: Math.random().toString(), value: goalTitle },
		]);
		setIsAddMode(false);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== goalId);
		});
	};

	const cancelGoalAddHandler = () => {
		setIsAddMode(false);
	}

	return (
		<View style={styles.screen}>
			<Text>After you add an item tap it to delete</Text>
			<Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
			<GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAddHandler}/>
			<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={(itemData) => (
					<GoalItem
						
						id={itemData.item.id}
						onDelete={removeGoalHandler}
						title={itemData.item.value}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { padding: 70 },
});
