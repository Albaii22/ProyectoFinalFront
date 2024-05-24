import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colorsApp } from "../assets/colors/colorsApp";
import { RenderCardListContext } from "../contexts/LoginContext";
import { ScrollView } from "react-native-gesture-handler";
import {
  createPublication,
  deletePublication,
  getAllPublications,
  getPublicationsByUserId,
  updatePublication,
} from "../services/publicationDataService";
import {
  getUsuarioById,
  getUsuarioIdByUsername,
} from "../services/userDataService";
import { CommentsDto } from "../interfaces/CommentsDto";
import {
  createComentario,
  getAllComentarios,
  getComentarioById,
} from "../services/commentDataService";
import { PublicationsDTO } from "../interfaces/publicationDto";
import { userDto } from "../interfaces/userDto";
const HomeScreen = () => {
  const { userName, themeMode } = useContext(RenderCardListContext);
  const [publications, setPublications] = useState<PublicationsDTO[]>([]);
  const [publicationUsernames, setPublicationUsernames] = useState<{
    [key: number]: string;
  }>({});
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [currentPublicationId, setCurrentPublicationId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [updatedPostInfo, setUpdatedPostInfo] = useState("");
  const [newPost, setNewPost] = useState("");
  const [commentUserId, setCommentUserId] = useState(0);
  const [newComment, setnewComment] = useState("");

  const toggleEditModal = (id: number) => {
    setIsEditModalVisible(!isEditModalVisible);

    setCurrentPublicationId(id);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const userId = await getUsuarioIdByUsername(userName);
        setCurrentUserId(userId);
        const publicationsData = await getAllPublications();
        setPublications(
          publicationsData.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        );
        await loadUsernames(publicationsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const loadUsernames = async (publicationsData: PublicationsDTO[]) => {
    const usernames: { [key: number]: string } = {};
    for (const publication of publicationsData) {
      const user = await getUsuarioById(publication.user_id);
      usernames[publication.id] = user.username;
    }
    setPublicationUsernames(usernames);
  };

  const toggleNewPostModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  const toggleCommentModal = (id: number, user_id: number) => {
    setCommentUserId(user_id);
    setCurrentPublicationId(id);
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  const createPublicationHandler = async (content: string) => {
    const newPublication: PublicationsDTO = {
      id: 0,
      user_id: currentUserId,
      content,
      vote_count: 0,
      timestamp: new Date().toISOString(),
      comments: [],
    };

    toggleNewPostModal();
    try {
      const response = await createPublication(currentUserId, newPublication);
      setPublications([response, ...publications]);
    } catch (err) {
      console.error("Error creating publication:", err);
    }
    setNewPost("");
  };

  const createCommentHandler = async (
    publicationId: number,
    content: string
  ) => {
    const newComment: CommentsDto = {
      content,
      timestamp: new Date().toISOString(),
      publicationId,
      userId: currentUserId,
    };

    try {
      await createComentario(newComment, currentUserId);
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  const deletePublicationHandler = async (publicationId: number) => {
    try {
      await deletePublication(publicationId);
      setPublications(publications.filter((pub) => pub.id !== publicationId));
    } catch (err) {
      console.error("Error deleting publication:", err);
    }
  };

  const handleOnChangeUpdate = (post: string) => {
    setUpdatedPostInfo(post);
  };

  const handleOnChangeAdd = (post: string) => {
    setNewPost(post);
  };
  const handleOnChangeComment = (post: string) => {
    setnewComment(post);
  };

  const editPublicationHandler = async () => {
    const updatedPublication = {
      ...publications.find((pub) => pub.id === currentPublicationId),
      content: updatedPostInfo,
    } as PublicationsDTO;

    try {
      await updatePublication(currentPublicationId, updatedPublication);
      setPublications(
        publications.map((pub) =>
          pub.id === currentPublicationId ? updatedPublication : pub
        )
      );
    } catch (err) {
      console.error("Error updating publication:", err);
    }
  };

  const getTimeSince = (timestamp: string): string => {
    const now = new Date();
    const publicationDate = new Date(timestamp);
    const seconds = Math.floor(
      (now.getTime() - publicationDate.getTime()) / 1000
    );

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " días";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos";

    return Math.floor(seconds) + " segundos";
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const CommentsModal: React.FC<CommentsDto[]> = (comments: CommentsDto[]) => {
    return (
      <Modal visible={isCommentModalVisible} transparent={true}>
        <View style={styles.containerAlert}>
          <View style={styles.alert}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.alertBody}
              onChangeText={handleOnChangeComment}
              value={newComment}
            ></TextInput>
            <Pressable
              style={styles.alertBtn}
              onPress={() =>
                createCommentHandler(comments[0].publicationId, newComment)
              }
            >
              <Text style={styles.btnText}>Add Coment</Text>
            </Pressable>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainer}
            >
              {comments.map((comment, index) => (
                <View key={index} style={styles.itemComment}>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              ))}
            </ScrollView>
            <Pressable
              style={styles.alertBtn}
              onPress={() => setIsCommentModalVisible(!isCommentModalVisible)}
            >
              <Text style={styles.btnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return themeMode ? (
    <ScrollView
      style={styles.containerDark}
      contentContainerStyle={styles.contentContainer}
    >
      <Pressable style={styles.addPostBtn} onPress={toggleNewPostModal}>
        <Text style={styles.addPostbtnText}>New Post</Text>
      </Pressable>
      {publications.map((publication) => (
        <View key={publication.id} style={styles.itemDark}>
          <Text style={styles.username}>
            {publicationUsernames[publication.id]}
          </Text>
          <Text style={styles.textDark}>{publication.content}</Text>
          <Text style={styles.timePublished}>
            {getTimeSince(publication.timestamp)}
          </Text>
          <Modal visible={isEditModalVisible} transparent={true}>
            <View style={styles.containerAlert}>
              <View style={styles.alert}>
                <Text style={styles.alertHeader}>Introduce the changes</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4} // Esto establece el número de líneas visibles inicialmente
                  textAlignVertical="top"
                  style={styles.alertBody}
                  onChangeText={handleOnChangeUpdate}
                  value={updatedPostInfo}
                ></TextInput>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => editPublicationHandler()}
                >
                  <Text style={styles.btnText}>Save changes</Text>
                </Pressable>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => toggleEditModal(publication.id)}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {currentUserId == publication.user_id ? (
            <View style={styles.rowBtns}>
              <Pressable
                style={styles.functionBtn}
                onPress={() => deletePublicationHandler(publication.id)}
              >
                <Text style={styles.btnFunctionText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.functionBtn}
                onPress={() => toggleEditModal(publication.id)}
              >
                <Text style={styles.btnFunctionText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.functionBtn}
                onPress={() =>
                  toggleCommentModal(currentPublicationId, publication.user_id)
                }
              >
                <Text style={styles.btnFunctionText}>Comment</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.functionBtn}
              onPress={() =>
                toggleCommentModal(currentPublicationId, publication.user_id)
              }
            >
              <Text style={styles.btnFunctionText}>Comment</Text>
            </Pressable>
          )}

          <Modal visible={isAddModalVisible} transparent={true}>
            <View style={styles.containerAlert}>
              <View style={styles.alert}>
                <Text style={styles.alertHeader}>
                  What are you thinking...?
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={styles.alertBody}
                  onChangeText={handleOnChangeAdd}
                  value={newPost}
                ></TextInput>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => createPublicationHandler(newPost)}
                >
                  <Text style={styles.btnText}>Post</Text>
                </Pressable>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => toggleNewPostModal()}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {CommentsModal(publication.comments)}
        </View>
      ))}
    </ScrollView>
  ) : (
    <ScrollView
      style={styles.containerLight}
      contentContainerStyle={styles.contentContainer}
    >
      <Pressable style={styles.addPostBtn} onPress={toggleNewPostModal}>
        <Text style={styles.addPostbtnText}>New Post</Text>
      </Pressable>
      {publications.map((publication) => (
        <View key={publication.id} style={styles.itemLight}>
          <Text style={styles.username}>
            {publicationUsernames[publication.id]}
          </Text>
          <Text style={styles.textLight}>{publication.content}</Text>
          <Text style={styles.timePublished}>
            {getTimeSince(publication.timestamp)}
          </Text>
          <Modal visible={isEditModalVisible} transparent={true}>
            <View style={styles.containerAlert}>
              <View style={styles.alert}>
                <Text style={styles.alertHeader}>Introduce the changes</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4} // Esto establece el número de líneas visibles inicialmente
                  textAlignVertical="top"
                  style={styles.alertBody}
                  onChangeText={handleOnChangeUpdate}
                  value={updatedPostInfo}
                ></TextInput>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => editPublicationHandler()}
                >
                  <Text style={styles.btnText}>Save changes</Text>
                </Pressable>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => toggleEditModal(publication.id)}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {currentUserId == publication.user_id ? (
            <View style={styles.rowBtns}>
              <Pressable
                style={styles.functionBtn}
                onPress={() => deletePublicationHandler(publication.id)}
              >
                <Text style={styles.btnFunctionText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.functionBtn}
                onPress={() => toggleEditModal(publication.id)}
              >
                <Text style={styles.btnFunctionText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.functionBtn}
                onPress={() =>
                  toggleCommentModal(currentPublicationId, publication.user_id)
                }
              >
                <Text style={styles.btnFunctionText}>Comment</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.functionBtn}
              onPress={() =>
                toggleCommentModal(currentPublicationId, publication.user_id)
              }
            >
              <Text style={styles.btnFunctionText}>Comment</Text>
            </Pressable>
          )}

          <Modal visible={isAddModalVisible} transparent={true}>
            <View style={styles.containerAlert}>
              <View style={styles.alert}>
                <Text style={styles.alertHeader}>
                  What are you thinking...?
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={styles.alertBody}
                  onChangeText={handleOnChangeAdd}
                  value={newPost}
                ></TextInput>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => createPublicationHandler(newPost)}
                >
                  <Text style={styles.btnText}>Post</Text>
                </Pressable>
                <Pressable
                  style={styles.alertBtn}
                  onPress={() => toggleNewPostModal()}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {CommentsModal(publication.comments)}
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: colorsApp.beige,
  },
  containerDark: {
    flex: 1,
    backgroundColor: colorsApp.black,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    width: "100%",
  },
  itemLight: {
    backgroundColor: colorsApp.black,
    width: "90%",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemDark: {
    backgroundColor: colorsApp.white,
    width: "90%",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemComment: {
    backgroundColor: colorsApp.beige,
    width: "90%",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  textLight: {
    color: colorsApp.beige,
    fontSize: 18,
  },
  textDark: {
    color: colorsApp.black,
    fontSize: 18,
  },
  commentText: {
    color: colorsApp.black,
    fontSize: 16,
  },
  timePublished: {
    fontSize: 14,
    color: colorsApp.light_gray,
  },
  username: {
    color: colorsApp.pink,
    fontSize: 21,
  },
  containerAlert: {
    marginTop: "50%",
    alignItems: "center",
    height: "70%",
    width: "100%",
  },
  alert: {
    backgroundColor: colorsApp.black,
    borderColor: colorsApp.pink,
    border: `2px solid ${colorsApp.pink}`,
    padding: 20,
    paddingBottom: "5%",
    width: "85%",
    height: "70%",
    borderRadius: 10,
    justifyContent: "center",
  },
  alertHeader: {
    fontSize: 22,
    alignSelf: "center",
    color: colorsApp.pink,
  },
  alertBody: {
    marginTop: "5%",
    fontSize: 17,
    height: "40%",
    width: "100%",
    paddingBottom: "10%",
    alignSelf: "center",
    justifyContent: "center",
    color: colorsApp.black,
    backgroundColor: colorsApp.beige,
    marginBottom: "5%",
  },
  alertBtn: {
    width: "100%",
    height: "15%",
    backgroundColor: colorsApp.light_blue,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: "3%",
    borderRadius: 10,
  },
  btnText: {
    color: colorsApp.black,
    fontSize: 16,
    fontWeight: "600",
  },
  rowBtns: {
    flexDirection: "row",
    height: "100%",
  },
  addPostBtn: {
    width: "40%",
    height: 30,
    marginTop: "3%",
    borderRadius: 10,
    backgroundColor: colorsApp.pink,
    marginHorizontal: "4%",
    alignItems: "center",
  },
  addPostbtnText: {
    color: colorsApp.white,
    fontSize: 17,
  },
  functionBtn: {
    width: "25%",
    height: "30%",
    marginTop: "2%",
    borderRadius: 10,
    paddingVertical: 6,
    backgroundColor: colorsApp.pink,
    marginHorizontal: "4%",
    alignItems: "center",
  },
  btnFunctionText: {
    color: colorsApp.white,
    fontSize: 14,
  },
});
