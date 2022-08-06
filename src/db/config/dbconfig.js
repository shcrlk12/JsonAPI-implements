require('dotenv').config();
module.exports = type => (require('knex')({
    //DB 타입
    client: type,

    //database 버전 (oracle, mysql 해당사항 없음)
    //version: ''

    //debug 모드
    debug: false,

    //connection 옵션
    connection: {
        //host
        host: 'localhost',
        //user
        user: 'root',
        //password
        password: '1234',
        //database or schema
        database: 'jsonapi',
        //기간 설정 토큰 (※mysql2 동작 안함.)        
        expirationChecker: () => Date.now() < Number(new Date('2020-12-30'))
    },

    //stack trace 옵션
    asyncStackTraces: true,

    //connection pool 옵션
    pool: {
        //최소 풀 개수
        min: 0,
        //최대 풀 개수
        max: 10,
        //커넥션이 생성된 후 할 로직 작성
        /* afterCreate: (conn, done) => {
            conn.query('SET timezone="UTC";', function(err) {
                if (err) {
                    // 첫 번째 쿼리가 실패할 때
                    done(err, conn);
                } else {
                    //두 번째 쿼리
                    conn.query('SELECT set_limit(0.01);', function(err) {
                        // err이 false 가 아니면 커넥션은 풀에서 제거된다.
                        // 쿼리에 의해 연결 쿼리가 작동할 경우 오류가 쿼리 프로미스로 전달된다.
                        done(err, conn);
                    });
                }
            });
        } */
    },
    //커넥션 타임아웃 시간 설정 ms 단위
    acquireConnectionTimeout: 10000,

    //배열에 넣은 타입을 조회했을 때 데이터가 스트링을 넘어오게 정의 (※oracledb에서만 사용)
    //fetchAsString: ['number', 'clob'], 

    //쿼리를 통해 결과값을 전달하기 전에 사용하는 함수, queryContext는 queryContext를 사용할 경우 사용할 수 있음 따라서 순수 쿼리로 작성될 경우 사용 못함.
    postProcessResponse: (result, queryContext) => {
        return result.map(ele => {
            ele.time = Date.now();
            return ele;
        });
    },


    //로그 설정
    log: {
        warn(msg) { console.warn(msg) },
        error(msg) { console.error(msg) },
        deprecate(msg) { console.log(msg) },
        debug(msg) { console.log(msg) }
    }
}));