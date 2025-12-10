import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";

async function run(input: string) {
  const response = await fetch("https://cors-header-proxy.samini7a.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  const json = await response.json();
  const outputs = json?.result?.output || [];
  const text = outputs
    .map((out: any) => (out.content || []).map((c: any) => c.text || "").join(""))
    .join("\n");

  return text || "No response";
}

// Simple markdown parser
const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  let inList = false;
  let listItems: string[] = [];

  const renderList = (items: string[], key: number) => (
    <View key={key} style={{ marginVertical: 4 }}>
      {items.map((item, idx) => (
        <Text key={idx} style={styles.listItem}>
          {"\u2022 " + item}
        </Text>
      ))}
    </View>
  );

  return lines.flatMap((line, index) => {
    line = line.trim();

    // Headers
    if (line.startsWith("### ")) {
      return (
        <Text key={index} style={styles.header3}>
          {line.replace("### ", "")}
        </Text>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <Text key={index} style={styles.header2}>
          {line.replace("## ", "")}
        </Text>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <Text key={index} style={styles.header1}>
          {line.replace("# ", "")}
        </Text>
      );
    }

    // Code blocks
    if (line.startsWith("```") || line.startsWith("`")) {
      return (
        <Text key={index} style={styles.codeBlock}>
          {line.replace(/```/g, "").replace(/`/g, "")}
        </Text>
      );
    }

    // HTML List handling
    if (line.startsWith("<ul>")) {
      inList = true;
      listItems = [];
      return null;
    }

    if (line.startsWith("</ul>")) {
      inList = false;
      const renderedList = renderList(listItems, index);
      listItems = [];
      return renderedList;
    }

    if (inList && line.startsWith("<li>") && line.endsWith("</li>")) {
      const item = line.replace("<li>", "").replace("</li>", "");
      listItems.push(item);
      return null;
    }

    // Markdown Lists
    if (line.startsWith("- ")) {
      const content = line
        .replace("- ", "")
        .split("-<br>")
        .map((part, i) => (
          <Text key={i}>
            {part}
            {i < line.split("-<br>").length - 1 ? "\n" : ""}
          </Text>
        ));

      return (
        <Text key={index} style={styles.listItem}>
          {"\u2022 "}
          {content}
        </Text>
      );
    }

    // Bold **text**
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = boldPattern.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<Text key={lastIndex}>{line.slice(lastIndex, match.index)}</Text>);
      }
      parts.push(
        <Text key={match.index} style={styles.boldText}>
          {match[1]}
        </Text>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(<Text key={lastIndex}>{line.slice(lastIndex)}</Text>);
    }
    if (parts.length > 0) return <Text key={index}>{parts}</Text>;

    // Handle -<br> in normal text
    if (line.includes("-<br>")) {
      const parts = line.split("-<br>").map((part, i) => (
        <Text key={i}>
          {part}
          {i < line.split("-<br>").length - 1 ? "\n" : ""}
        </Text>
      ));
      return (
        <Text key={index} style={styles.regularText}>
          {parts}
        </Text>
      );
    }

    // Regular text
    return (
      <Text key={index} style={styles.regularText}>
        {line}
      </Text>
    );
  });
};

const AIPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse("");

    try {
      const aiResponse = await run(prompt);
      setResponse(aiResponse);
    } catch (e) {
      setResponse("Error fetching AI response");
      console.log(e);
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
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : parseMarkdown(response)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    backgroundColor: "white",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", color: "white", fontSize: 16 },
  responseContainer: {
    flex: 1,
    padding: 15,
    direction: "rtl",
    paddingBottom: 30,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  regularText: { fontSize: 16, marginBottom: 5 },
  header1: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  header2: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  header3: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  codeBlock: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  listItem: { fontSize: 16, marginLeft: 10, marginBottom: 5 },
  boldText: { fontWeight: "bold" },
});

export default AIPage;
