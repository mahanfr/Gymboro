import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import { useNavigation } from "expo-router";

async function run(input: any) {
  const response = await fetch("https://cors-header-proxy.samini7a.workers.dev/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(input),
  });

  // Check for HTTP errors first
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }

  // Handle streaming response
  const reader = response.body?.getReader();
  if (reader) {
    let chunks = [];
    let totalLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Store chunks instead of concatenating strings
      chunks.push(value);
      totalLength += value.length;
    }

    // Combine all chunks into single Uint8Array
    const combined = new Uint8Array(totalLength);
    let position = 0;
    for (const chunk of chunks) {
      combined.set(chunk, position);
      position += chunk.length;
    }

    // Decode once at the end
    const result = new TextDecoder().decode(combined);

    try {
      const jsonResponse = JSON.parse(result);
      return jsonResponse.result?.response || jsonResponse.response || jsonResponse;
    } catch (e) {
      console.error("JSON parse error:", e, "Response:", result);
      throw new Error("Invalid JSON response from API");
    }
  }
  // Handle non-streaming response
  else {
    const result = await response.json();
    return result.result?.response || result.response || result;
  }
}
// Function to format AI response with special characters and links

const AIPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation: any = useNavigation();
  const formatAIResponse = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        // Heading style
        return (
          <Text key={index} style={styles.heading}>
            {line.replace(/\*\*/g, "")}
          </Text>
        );
      } else if (line.trim().startsWith("*")) {
        // List item style with potential links
        const lineContent = line.replace(/^\*\s+/, "").trim();

        // Check for <a> tags
        const linkRegex = /<a src="([^"]+)">([^<]+)<\/a>/;
        const match = lineContent.match(linkRegex);

        if (match) {
          const [fullMatch, url, linkText] = match;
          const parts = lineContent.split(fullMatch);

          return (
            <View key={index} style={styles.listItemContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>
                {parts[0]}
                <Pressable style={styles.linkBox} onPress={() => handleLinkPress(url)}>
                  <Text style={styles.linkBoxText}>{linkText}</Text>
                </Pressable>
                {parts[1]}
              </Text>
            </View>
          );
        } else {
          return (
            <View key={index} style={styles.listItemContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>{lineContent}</Text>
            </View>
          );
        }
      } else if (line.trim() === "") {
        // Empty line (spacing)
        return <View key={index} style={styles.spacing}></View>;
      } else {
        // Regular text with potential links
        const linkRegex = /<a src="([^"]+)">([^<]+)<\/a>/g;
        let lastIndex = 0;
        const elements = [];
        let match;

        while ((match = linkRegex.exec(line)) !== null) {
          const [fullMatch, url, linkText] = match;

          // Add text before the link
          if (match.index > lastIndex) {
            elements.push(
              <Text key={`${index}-${lastIndex}`}>{line.substring(lastIndex, match.index)}</Text>
            );
          }

          // Add the link box
          elements.push(
            <Pressable
              key={`${index}-${match.index}`}
              style={styles.linkBox}
              onPress={() => handleLinkPress(url)}
            >
              <Text style={styles.linkBoxText}>{linkText}</Text>
            </Pressable>
          );

          lastIndex = match.index + fullMatch.length;
        }

        // Add remaining text after last link
        if (lastIndex < line.length) {
          elements.push(<Text key={`${index}-end`}>{line.substring(lastIndex)}</Text>);
        }

        return (
          <Text key={index} style={styles.regularText}>
            {elements.length > 0 ? elements : line}
          </Text>
        );
      }
    });
  };
  // Function to handle link press
  const handleLinkPress = (url: string) => {
    navigation.navigate("workouts/[id]", { id: url });
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    console.log(prompt);
    setIsLoading(true);
    setResponse("");

    try {
      // Replace mockAIRequest with your actual API call
      const aiResponse = await run(prompt);
      setResponse(aiResponse);
    } catch (error) {
      setResponse("Error: Failed to get response from AI");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>

      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter your request..."
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <ScrollView style={styles.responseContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : response ? (
          formatAIResponse(response)
        ) : (
          <Text style={styles.placeholder}>Your AI response will appear here...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    minHeight: 80,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  responseContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  listItemContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: 8,
    fontSize: 16,
    color: "#444",
  },
  listItemText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  regularText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#444",
  },
  linkBox: {
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: "#90caf9",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  linkBoxText: {
    color: "#1976d2",
    fontSize: 16,
  },
  spacing: {
    height: 10,
  },
  placeholder: {
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AIPage;
