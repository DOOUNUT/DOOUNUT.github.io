import { Code2, Database, Layers3, Smartphone, Wrench } from 'lucide-react';
import albaImage from '../assets/projects/alba-app.png';
import itdaImage from '../assets/projects/itda-chat.png';
import mbtiImage from '../assets/projects/mbti-mypage.png';

export const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

const devicon = (name, path) => ({
  name,
  icon: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`
});

export const skills = [
  {
    title: 'Frontend',
    icon: Code2,
    items: [
      devicon('HTML', 'html5/html5-original.svg'),
      devicon('CSS', 'css3/css3-original.svg'),
      devicon('JavaScript', 'javascript/javascript-original.svg'),
      devicon('React', 'react/react-original.svg'),
      devicon('Redux', 'redux/redux-original.svg'),
      devicon('Tailwind CSS', 'tailwindcss/tailwindcss-original.svg')
    ]
  },
  {
    title: 'Backend',
    icon: Layers3,
    items: [
      devicon('Java', 'java/java-original.svg'),
      devicon('Spring MVC', 'spring/spring-original.svg'),
      devicon('Spring Boot', 'spring/spring-original.svg'),
      devicon('Spring Security', 'spring/spring-original.svg'),
      devicon('REST API', 'fastapi/fastapi-original.svg'),
      devicon('MyBatis', 'apache/apache-original.svg'),
      devicon('JPA', 'hibernate/hibernate-original.svg')
    ]
  },
  {
    title: 'Database',
    icon: Database,
    items: [
      devicon('Oracle', 'oracle/oracle-original.svg'),
      devicon('Firebase', 'firebase/firebase-original.svg')
    ]
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    items: [
      devicon('Flutter', 'flutter/flutter-original.svg'),
      devicon('Dart', 'dart/dart-original.svg')
    ]
  },
  {
    title: 'Tools',
    icon: Wrench,
    items: [
      devicon('Git', 'git/git-original.svg'),
      devicon('GitHub', 'github/github-original.svg'),
      devicon('VS Code', 'vscode/vscode-original.svg'),
      devicon('Figma', 'figma/figma-original.svg'),
      devicon('Postman', 'postman/postman-original.svg')
    ]
  }
];

export const projects = [
  {
    name: 'Alba Management App(진행중)',
    image: albaImage,
    summary: '아르바이트 일정 및 급여 관리 모바일 앱',
    period: 'Personal Project',
    team: '개인 프로젝트',
    role: 'Flutter · Firebase',
    imageLabel: 'Schedule · Pay · Mobile UX',
    tech: ['Flutter', 'Dart', 'Firebase'],
    detailTitle: '핵심 구현',
    description:
      '아르바이트 근무 일정과 예상 급여를 관리하는 모바일 앱입니다. 모바일 환경에서 빠르게 확인하고 입력할 수 있는 UI 흐름을 중심으로 설계했습니다.',
    codeSnippets: [
      {
        title: '근무 일정 등록 화면 흐름',
        path: 'lib/screens/work_schedule_screen.dart',
        code: [
          'class WorkScheduleScreen extends StatefulWidget {',
          '  const WorkScheduleScreen({super.key});',
          '',
          '  @override',
          '  State<WorkScheduleScreen> createState() => _WorkScheduleScreenState();',
          '}',
          '',
          'class _WorkScheduleScreenState extends State<WorkScheduleScreen> {',
          '  DateTime selectedDate = DateTime.now();',
          '  TimeOfDay startTime = const TimeOfDay(hour: 9, minute: 0);',
          '  TimeOfDay endTime = const TimeOfDay(hour: 18, minute: 0);',
          '',
          '  void saveSchedule() {',
          '    final schedule = WorkSchedule(',
          '      date: selectedDate,',
          '      startTime: startTime,',
          '      endTime: endTime,',
          '    );',
          '    scheduleRepository.save(schedule);',
          '  }',
          '}'
        ].join('\n')
      },
      {
        title: '예상 급여 계산 로직',
        path: 'lib/features/pay/pay_calculator.dart',
        code: [
          'int calculateExpectedPay({',
          '  required int hourlyWage,',
          '  required int workMinutes,',
          '  int breakMinutes = 0,',
          '}) {',
          '  final paidMinutes = workMinutes - breakMinutes;',
          '  return ((hourlyWage / 60) * paidMinutes).floor();',
          '}'
        ].join('\n')
      },
      {
        title: 'Firebase 저장 데이터 구조',
        path: 'lib/repositories/schedule_repository.dart',
        code: [
          'Future<void> save(WorkSchedule schedule) async {',
          '  await FirebaseFirestore.instance.collection("schedules").add({',
          '    "date": schedule.date.toIso8601String(),',
          '    "startTime": schedule.startTimeText,',
          '    "endTime": schedule.endTimeText,',
          '    "hourlyWage": schedule.hourlyWage,',
          '    "createdAt": FieldValue.serverTimestamp(),',
          '  });',
          '}'
        ].join('\n')
      },
      {
        title: '앱 실행 오류 로그 확인',
        path: 'lib/main.dart',
        code: [
          'Future<void> main() async {',
          '  WidgetsFlutterBinding.ensureInitialized();',
          '',
          '  FlutterError.onError = (FlutterErrorDetails details) {',
          '    debugPrint(details.exceptionAsString());',
          '    debugPrintStack(stackTrace: details.stack);',
          '  };',
          '',
          '  await Firebase.initializeApp();',
          '  runApp(const AlbaManagementApp());',
          '}'
        ].join('\n')
      }
    ],
    myPart: [
      {
        title: '모바일 중심 일정 관리',
        body: '근무 일정을 빠르게 등록하고 확인할 수 있도록 Flutter 위젯 구조와 화면 흐름을 구성했습니다.',
        codeSnippet: 0
      },
      {
        title: '예상 급여 계산',
        body: '시급, 근무 시간, 휴게 시간 정보를 바탕으로 예상 급여를 계산하는 핵심 로직을 설계했습니다.',
        codeSnippet: 1
      },
      {
        title: 'Firebase 기반 데이터 설계',
        body: '근무 일정, 급여 정보, 익명 게시판 데이터를 Firebase에 저장하는 구조를 고려해 화면과 데이터 흐름을 설계했습니다.',
        codeSnippet: 2
      },
      {
        title: '앱 실행 오류 분석',
        body: 'Flutter 앱 실행 중 종료되는 문제를 로그 중심으로 확인하며 실행 환경과 의존성 문제를 분석했습니다.',
        codeSnippet: 3
      }
    ]
  },
  {
    name: 'MBTI Community',
    image: mbtiImage,
    summary: 'MBTI 기반 커뮤니티 서비스',
    period: 'Team Project',
    team: '6명',
    role: 'Login · My Page',
    imageLabel: 'Community · Game · Chatbot',
    tech: ['React', 'Spring Boot', 'Spring Security', 'JWT', 'Oracle'],
    detailTitle: '내가 맡은 부분',
    description:
      'MBTI 성향을 기반으로 게시판, 밸런스 게임, 미니게임, 챗봇을 제공하는 커뮤니티 서비스입니다. 프론트엔드와 백엔드를 분리한 REST API 구조로 설계했습니다.',
    codeSnippets: [
      {
        title: '로그인 후 JWT 인증 상태 저장',
        path: 'src/api/authApi.ts',
        code: [
          'const { accessToken, refreshToken, user } = res.data;',
          '',
          'store.dispatch(setAuth({',
          '  accessToken,',
          '  userId: user.userId,',
          '  refreshToken: refreshToken ?? null,',
          '  user,',
          '}));'
        ].join('\n')
      },
      {
        title: 'Authorization 헤더 자동 첨부',
        path: 'src/api/authApi.ts',
        code: [
          'authApi.interceptors.request.use((config) => {',
          '  const token = getAccessToken();',
          '  const isNoAuthUrl = noAuthUrls.some((url) =>',
          '    config.url?.startsWith(url)',
          '  );',
          '',
          '  if (!isNoAuthUrl && token) {',
          '    if (!config.headers) config.headers = new AxiosHeaders();',
          '    config.headers.set("Authorization", `Bearer ${token}`);',
          '  }',
          '',
          '  return config;',
          '});'
        ].join('\n')
      },
      {
        title: 'Access Token 만료 시 재발급 후 요청 재시도',
        path: 'src/api/authApi.ts',
        code: [
          'authApi.interceptors.response.use(',
          '  (res) => res,',
          '  async (err) => {',
          '    const original = err.config;',
          '    if (err.response?.status === 401 && !original._retry) {',
          '      original._retry = true;',
          '      const { data } = await authApi.post("/refresh");',
          '      original.headers.set("Authorization", `Bearer ${data.accessToken}`);',
          '      return authApi(original);',
          '    }',
          '    return Promise.reject(err);',
          '  }',
          ');'
        ].join('\n')
      },
      {
        title: 'Refresh 중복 요청 대기 큐',
        path: 'src/api/authApi.ts',
        code: [
          'let isRefreshing = false;',
          'let waiters = [];',
          '',
          'if (isRefreshing) {',
          '  return new Promise((resolve, reject) => {',
          '    waiters.push((newToken) => {',
          '      if (!newToken) return reject(error);',
          '      original.headers.set("Authorization", `Bearer ${newToken}`);',
          '      resolve(authApi(original));',
          '    });',
          '  });',
          '}'
        ].join('\n')
      },
      {
        title: '새로고침 후 로그인 상태 복구',
        path: 'src/components/AuthGate.tsx',
        code: [
          'useEffect(() => {',
          '  authApi.post("/refresh")',
          '    .then((res) => {',
          '      dispatch(setAuth({',
          '        accessToken: res.data.accessToken,',
          '        userId: res.data.user?.userId ?? 0,',
          '        user: res.data.user ?? null,',
          '      }));',
          '    })',
          '    .catch(() => dispatch(logout()))',
          '    .finally(() => setReady(true));',
          '}, [dispatch]);'
        ].join('\n')
      },
      {
        title: '마이페이지 Bearer 토큰 API 요청',
        path: 'src/api/mypageApi.ts',
        code: [
          'mypageApi.interceptors.request.use((config) => {',
          '  const token = store.getState().auth.accessToken;',
          '',
          '  if (!config.headers) config.headers = new AxiosHeaders();',
          '  config.headers.set("Authorization", `Bearer ${token}`);',
          '',
          '  return config;',
          '});',
          '',
          'export const getScores = (userId: number) =>',
          '  mypageApi.get(`/score/${userId}`);'
        ].join('\n')
      },
      {
        title: '회원 정보 수정 후 Redux 갱신',
        path: 'src/pages/myPage/ChangeNick.tsx',
        code: [
          'const handleChangeNick = async () => {',
          '  const res = await updateNick(newNickname, user.userId, user.point);',
          '',
          '  dispatch(setAuth({',
          '    accessToken,',
          '    refreshToken,',
          '    userId: user.userId,',
          '    user: { ...user, nickName: res.nickName, point: res.point },',
          '  }));',
          '',
          '  onClose();',
          '};'
        ].join('\n')
      }
    ],
    myPart: [
      {
        title: 'JWT 로그인 연동',
        body: '로그인 성공 시 서버가 발급한 accessToken, refreshToken, 사용자 정보를 받아 Redux 인증 상태에 저장했습니다.',
        codeSnippet: 0
      },
      {
        title: 'Authorization 헤더 자동 처리',
        body: 'Axios interceptor를 사용해 인증이 필요한 요청마다 Bearer 토큰을 자동 첨부하고, 로그인/회원가입/refresh 요청은 예외 처리했습니다.',
        codeSnippet: 1
      },
      {
        title: 'Access Token 재발급 흐름',
        body: '401 응답 발생 시 refresh API를 호출해 새 accessToken을 발급받고, 실패했던 기존 요청을 다시 실행하는 흐름을 구현했습니다.',
        codeSnippet: 2
      },
      {
        title: '중복 Refresh 요청 방지',
        body: '동시에 여러 요청이 401을 받을 때 refresh 요청이 반복 실행되지 않도록 대기 큐를 두고 토큰 갱신 후 재요청을 처리했습니다.',
        codeSnippet: 3
      },
      {
        title: '로그인 상태 복구',
        body: 'AuthGate에서 앱 시작 시 refresh 검증을 수행해 새로고침 후에도 로그인 상태를 복구하고, 실패하면 logout 처리했습니다.',
        codeSnippet: 4
      },
      {
        title: '마이페이지 기능 구현',
        body: 'Redux 사용자 정보와 Bearer 토큰 기반 API를 활용해 프로필, 게임 점수, 작성 게시글 조회 화면을 구성했습니다.',
        codeSnippet: 5
      },
      {
        title: '회원 정보 수정 모달',
        body: '닉네임, 비밀번호, 프로필 이미지, MBTI 변경 기능을 모달 단위로 분리해 마이페이지 수정 흐름을 구현했습니다.',
        codeSnippet: 6
      }
    ]
  },
   {
    name: 'ITDA',
    image: itdaImage,
    summary: '대여, 경매, 나눔 기능을 제공하는 웹 플랫폼',
    period: 'Team Project',
    team: '6명',
    role: 'Open Chat · Realtime Alarm',
    imageLabel: 'Rental · Auction · Sharing Platform',
    tech: ['Java', 'Spring MVC', 'MyBatis', 'Oracle', 'JSP', 'WebSocket'],
    detailTitle: '내가 맡은 부분',
    description:
      '사용자가 물품을 대여하거나 경매에 참여하고, 나눔 게시글을 통해 거래할 수 있는 통합 웹 플랫폼입니다. 실시간 소통과 위치 기반 거래 경험을 중심으로 구성했습니다.',
    codeSnippets: [
      {
        title: '게시글 기반 오픈채팅방 생성',
        path: 'ChatController.java',
        code: [
          '@PostMapping("/openChatRoom")',
          'public String openChatRoom(@RequestBody SelectBoardInfo boardInfo, Authentication authentication) {',
          '  UserExt loginUser = (UserExt) authentication.getPrincipal();',
          '  int userNum = loginUser.getUserNum();',
          '  int boardOwnerNum = boardInfo.getUserNum();',
          '  int refNum = boardInfo.getTransactionRefNum();',
          '  int boardId = boardInfo.getBoardId();',
          '',
          '  int result = chatService.openChatRoom(userNum, boardOwnerNum, refNum, boardId);',
          '  return result > 0 ? "success" : "fail";',
          '}'
        ].join('\n')
      },
      {
        title: '채팅방 관련 테이블 동시 생성',
        path: 'ChatDao.java',
        code: [
          'public int openChatRoom(Map<String, Object> map) {',
          '  int result = session.insert("chat.openChatRoom", map);',
          '',
          '  session.insert("chat.openTransactionChatRoom", map);',
          '  session.insert("chat.openChatParticipantBuyer", map);',
          '  session.insert("chat.openChatParticipantSeller", map);',
          '',
          '  return result;',
          '}'
        ].join('\n')
      },
      {
        title: '중복 채팅방 참여 여부 확인',
        path: 'chat-mapper.xml',
        code: [
          '<select id="joinCheck" resultType="int" parameterType="map">',
          '  SELECT CP1.USER_NUM',
          '  FROM TRANSACTION_CHAT TC',
          '  JOIN CHAT_PARTICIPANT CP1',
          '    ON CP1.USER_NUM = #{userNum} AND CP1.STATUS = \'Y\'',
          '  JOIN CHAT_PARTICIPANT CP2',
          '    ON CP2.USER_NUM = #{boardOwnerNum} AND CP2.STATUS = \'Y\'',
          '  WHERE TC.BOARD_ID = #{boardId}',
          '    AND CP1.CHATROOM_ID = TC.CHATROOM_ID',
          '    AND CP2.CHATROOM_ID = TC.CHATROOM_ID',
          '</select>'
        ].join('\n')
      },
      {
        title: 'STOMP 메시지 저장 후 실시간 브로드캐스트',
        path: 'ChatStompController.java',
        code: [
          '@MessageMapping("/chat/sendMessage")',
          'public void sendMessage(@Payload HashMap<String, Object> messageMap, Authentication authentication) {',
          '  ChatMessage chatMessage = new ChatMessage();',
          '  chatMessage.setChatRoomId((int) messageMap.get("chatRoomId"));',
          '  chatMessage.setChatContent((String) messageMap.get("chatContent"));',
          '',
          '  int result = service.sendMessage(chatMessage);',
          '  if (result > 0) {',
          '    messagingTemplate.convertAndSend("/topic/room/" + chatRoomId, chatMessage);',
          '  }',
          '}'
        ].join('\n')
      },
      {
        title: '메시지 전송 전 사용자 정보 조회',
        path: 'resources/js/stomp.js',
        code: [
          'fetch(contextPath + "/chat/getSenderInfo?userNum=" + userNum)',
          '  .then((response) => response.json())',
          '  .then((senderInfo) => {',
          '    stompClient.send("/app/chat/sendMessage", {}, JSON.stringify({',
          '      chatRoomId,',
          '      userNum,',
          '      chatContent: message,',
          '      nickName: senderInfo.nickName,',
          '      imageUrl: senderInfo.imageUrl',
          '    }));',
          '  });'
        ].join('\n')
      },
      {
        title: '채팅 알림 저장 및 사용자별 전송',
        path: 'AlarmServiceImpl.java',
        code: [
          'for (Integer userId : userNums) {',
          '  if (userId.equals(loginUser.getUserNum())) continue;',
          '',
          '  Alarm alarm = new Alarm();',
          '  alarm.setReceiverId(userId);',
          '  alarm.setAlarmType("CHAT");',
          '  alarm.setRefId(chatRoomId);',
          '  alarm.setIsRead("N");',
          '  dao.insertAlarm(alarm);',
          '',
          '  messagingTemplate.convertAndSend("/topic/alarm/" + userId, alarmPayload);',
          '}'
        ].join('\n')
      },
      {
        title: '채팅방 나가기 상태 변경 및 시스템 메시지',
        path: 'ChatController.java',
        code: [
          '@PostMapping("/exit/{chatRoomId}")',
          'public void exitChatRoom(@PathVariable int chatRoomId, Authentication auth) {',
          '  UserExt loginUser = (UserExt) auth.getPrincipal();',
          '  chatService.exitChatRoom(Map.of("chatRoomId", chatRoomId, "userNum", loginUser.getUserNum()));',
          '',
          '  ChatMessage systemMsg = new ChatMessage();',
          '  systemMsg.setChatRoomId(chatRoomId);',
          '  systemMsg.setChatContent(loginUser.getNickName() + "님이 채팅방을 나갔습니다.");',
          '  chatService.sendMessage(systemMsg);',
          '',
          '  messagingTemplate.convertAndSend("/topic/room/" + chatRoomId, systemMsg);',
          '}'
        ].join('\n')
      },
      {
        title: 'WebSocket STOMP 엔드포인트 연결',
        path: 'root-context.xml / stomp.js',
        code: [
          '<websocket:stomp-endpoint path="/stomp">',
          '  <websocket:sockjs />',
          '</websocket:stomp-endpoint>',
          '',
          'const socket = new SockJS(contextPath + "/stomp");',
          'const stompClient = Stomp.over(socket);',
          '',
          'stompClient.connect({}, () => {',
          '  stompClient.subscribe(`/topic/room/${chatRoomId}`, onMessage);',
          '});'
        ].join('\n')
      }
    ],
    myPart: [
      {
        title: '거래 오픈채팅방 생성',
        body: '게시글 상세에서 선택한 boardId와 거래 정보를 바탕으로 로그인 사용자와 게시글 작성자를 연결하는 채팅방 생성 흐름을 구현했습니다.',
        codeSnippet: 0
      },
      {
        title: '채팅방 DB 연동',
        body: 'CHAT_ROOM, TRANSACTION_CHAT, CHAT_PARTICIPANT 테이블에 채팅방과 구매자/판매자 참여 정보를 함께 저장하도록 구성했습니다.',
        codeSnippet: 1
      },
      {
        title: '중복 채팅방 참여 방지',
        body: 'joinCheck 쿼리로 이미 활성화된 거래 채팅방 참여 데이터가 있는지 확인해 중복 생성 문제를 방지했습니다.',
        codeSnippet: 2
      },
      {
        title: 'STOMP 기반 실시간 채팅',
        body: 'SockJS와 STOMP를 이용해 /stomp에 연결하고 메시지를 /app/chat/sendMessage로 전송한 뒤 /topic/room/{chatRoomId}로 브로드캐스트했습니다.',
        codeSnippet: 3
      },
      {
        title: '채팅 사용자 정보 표시',
        body: '메시지 전송 전 사용자 닉네임과 프로필 이미지를 조회해 채팅 메시지 UI에 함께 표시되도록 연동했습니다.',
        codeSnippet: 4
      },
      {
        title: '실시간 알림 구현',
        body: '채팅 메시지 저장 후 참여자 목록을 조회하고, 보낸 사람을 제외한 사용자에게 CHAT 타입 알림을 DB 저장 및 /topic/alarm/{userId}로 전송했습니다.',
        codeSnippet: 5
      },
      {
        title: '채팅방 나가기 처리',
        body: '채팅방 나가기 시 참여 상태를 비활성화하고 시스템 메시지를 저장/브로드캐스트하는 흐름을 구성했습니다.',
        codeSnippet: 6
      },
      {
        title: 'WebSocket 오류 분석',
        body: 'STOMP 연결 실패와 메시지 수신 문제를 브라우저 콘솔, 서버 로그, 연결 경로를 기준으로 추적해 원인을 분석했습니다.',
        codeSnippet: 7
      }
    ]
  }
];

export const timeline = [
  ['동서울대학교 컴퓨터정보과 졸업', '컴퓨터공학 기반 전공 지식 학습'],
  ['KH정보교육원 개발자 과정 수료', 'Java, Spring, Oracle, React 기반 실무형 교육'],
  ['Java, Spring, React 팀 프로젝트 경험', '기획, 구현, 오류 분석, 협업 흐름 경험'],
  ['Flutter 모바일 앱 개발', '일정 및 급여 관리 앱 UI/UX와 Firebase 연동']
];
